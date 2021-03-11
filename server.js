const express = require('express')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const port = new SerialPort('/dev/cu.usbmodem14101', {
  baudRate: 9600
})

const parser = port.pipe(new Readline({ delimiter: '\n' }))

const app = express()
app.use(express.static('public'))

const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer)

io.on('connection', (socket) => {
  parser.on('data', (data) => {
    const values = data.split(',').map(item => item.trim())
    socket.emit('data', values)
  })
})

httpServer.listen(3000)
