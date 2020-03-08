const express = require('express')
const net = require('net')
const consola = require('consola')
const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()

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
    (function getStarted(devPort) {
      var server = net.createServer().listen(devPort)
      server.on('listening', function () { // 执行这块代码说明端口未被占用
        server.close() // 关闭服务
        app.listen(devPort, host)
        consola.ready({
          message: `Server listening on http://${host}:${devPort}`,
          badge: true
        })
      })
      server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') { // 端口已经被使用
          getStarted(Math.ceil(Math.random() * 10000))
        }
      })
    })(Math.ceil(Math.random() * 10000))
  } else {
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  }
}
start()
