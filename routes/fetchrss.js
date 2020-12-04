const express = require('express')
const axios = require('axios')
const rssParser = require('rss-parser')

const router = express.Router()
const parser = new rssParser()

router.get('/:rssId?', async (req, res, next) => {
  if (/[a-f0-9]{48}/.test(req.params.rssId)) {
    try {
      const response = await axios.get(`http://fetchrss.com/rss/${req.params.rssId}.xml`)
      const feed = await parser.parseString(response.data)
      res.locals.status = 200
      console.log(feed.items[0])
      res.locals.data = feed.items.map(item => {
        const contentLength = item.content.length
        const snippetLength = item.contentSnippet.length
        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          content: snippetLength == 30
            ? item.content.slice(10, contentLength - 144)
            : item.contentSnippet.slice(0, snippetLength - 31)
        }
      })
      next()
    } catch (error) {
      console.log(error)
      res.locals.status = 502
      next()
    }
  } else {
    res.locals.status = 400
    next()
  }
})

module.exports = router