console.log("hello server")
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const http = require('http').createServer(app)
// Express App Config
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  }
  app.use(cors(corsOptions))
}
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const playlistRoutes = require('./api/playlist/playlist.routes')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.use('/api/playlist', playlistRoutes)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


const port = process.env.PORT || 3030
const logger = require('./services/logger.service')

http.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})