const mineflayer = require('mineflayer')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('AFK Bot Running')
})

app.listen(process.env.PORT || 3000)

function createBot() {

  const bot = mineflayer.createBot({
    host: 'tbgm.mcsh.io',
    port: 25565,
    username: 'ServerTBG',
    auth: 'offline',
    version: '1.21.11'
  })

  bot.on('spawn', () => {
    console.log('Bot joined server!')

    // AuthMe login
    setTimeout(() => {
      bot.chat('/login serverisHIMTBG')
    }, 3000)

    // Anti AFK
    setInterval(() => {

      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 1000)

      const directions = ['forward', 'back', 'left', 'right']

      const dir = directions[Math.floor(Math.random() * directions.length)]

      bot.setControlState(dir, true)

      setTimeout(() => {
        bot.setControlState(dir, false)
      }, 2000)

      bot.look(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI / 2,
        true
      )

    }, 15000)
  })

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10 seconds...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', err => console.log(err))
}

createBot()
