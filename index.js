const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express()
const cors = require('cors')
app.use(cors())

const baseUrl = 'https://www.theguardian.com'; //target urls
const url = `${baseUrl}/europe`;

app.get('/', function (req, res) {
    res.json('Webscraper v1.0')
})




app.get('/results', (req, res) => {
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
            res.json(articles)
        }).catch(err => console.log(err))

})
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
