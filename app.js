const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 5000

// routers
const indexRouter = require(path.join(__dirname, 'routes/index'))
const fetchrssRouter = require(path.join(__dirname, 'routes/fetchrss'))

// init & config
const app = express()
app.use('/', indexRouter)
app.use('/fetchrss', fetchrssRouter)
app.use((req, res) => {
  const { status, data } = res.locals
  if (status !== undefined) {
    if (status == 200) {
      res.set('Content-Type', 'application/json; charset=utf-8').json(data)
    } else {
      res.sendStatus(status)
    }
  } else {
    res.sendStatus(404)
  }
})

// run
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
