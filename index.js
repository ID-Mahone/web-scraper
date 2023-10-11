const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express()
const baseUrl = 'https://www.theguardian.com'; //target urls
const url = `${baseUrl}/europe`;


function fetchData() {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            $('.dcr-12ilguo', html).each(function () {
                const title = $(this).text()
                const relativeUrl = $(this).find('a').attr('href')
                const completeUrl = `${baseUrl}${relativeUrl}`
                articles.push({
                    title,
                    url: completeUrl
                })
            })
            console.log(articles)
        }).catch(err => console.log(err))
}

setInterval(fetchData, 5000); //fetch data every 5 seconds
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
