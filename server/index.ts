const express = require('express')
const net = require('net')
const consola = require('consola')
const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()

function randomNum(minNum:number, maxNum:number):number {
  switch (arguments.length) {
    case 1:
      return parseInt((Math.random() * minNum + 1).toString(), 10);
      break;
    case 2:
      return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10);
      break;
    default:
      return 0;
      break;
  }
}

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host,
    port
  } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  // Random port number only in dev mode
  if (config.dev) {
    const devPort = randomNum(1000,60000)
    app.listen(devPort, host)
    consola.ready({
      message: `Server listening on http://${host}:${devPort}`,
      badge: true
    })
  } else {
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  }
}
start()
