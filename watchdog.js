const express = require('express')

const lastPings = {}
const app = express()
app.use(express.json())

/* wanted output!
# HELP watchdog_lastping timestamp of last ping
# TYPE watchdog_lastping gauge
watchdog_lastping{cluster="swissmedia-gra7"} 1631530000000
watchdog_lastping{cluster="swissmedia-sbg5"} 1631530000000
*/

app.get('/ping/:cluster', (req, res) => {
  const { cluster } = req.params
  lastPings[cluster] = Date.now()
  res.end('pong')
})

app.get('/metrics', (req, res) => {
  const strings = [
    '# HELP watchdog_lastping timestamp of last ping',
    '# TYPE watchdog_lastping gauge'
  ]
  for (const cluster in lastPings) {
    strings.push(
      `watchdog_lastping{cluster="${cluster}"} ${lastPings[cluster]}`
    )
  }
  res.end(strings.join('\n'))
})

app.listen(process.env.PORT || 8080, () => {})
process.on('SIGTERM', () => process.exit())
process.on('SIGINT', () => process.exit())
