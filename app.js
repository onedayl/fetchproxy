const express = require('express')
const PORT = process.env.PORT || 5000

// routers
const indexRouter = require('./routes/index')
const fetchrssRouter = require('./routes/fetchrss')

// init & config
const app = express()
app.use('/', indexRouter)
app.use('/fetchrss', fetchrssRouter)
app.use((req, res) => {
  const { status, data } = res.locals
  if (status !== undefined) {
    if (status == 200) {
      res.end(JSON.stringify(data))
    } else {
      res.sendStatus(status)
    }
  } else {
    res.sendStatus(404)
  }
})

// run
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
