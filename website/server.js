const EventEmitter = require('events')
const express = require('express')

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const arduinoEvents = new EventEmitter()
const port = new SerialPort('/dev/cu.usbmodem14101', { baudRate: 9600 })
const parser = port.pipe(new Readline({ delimiter: '\n' }))

const app = express()
app.use(express.static('public'))

const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer, {
  cors: { origin: "http://localhost:3000", }
})

parser.on('data', (data) => {
  const values = data.split(',').map(item => Math.floor(item.trim() / 100))  
  arduinoEvents.emit('data', { data: values })
})

io.on('connection', (socket) => {
  arduinoEvents.addListener('data', ({ data }) => { socket.emit('data', data) })
})

httpServer.listen(3001)
