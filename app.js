const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const PORT = config.get('port') || 5000

const app = express()

app.use(express.json({extended: true}))

// app.use(require("body-parser").json())
app.use('/api/auth', require('./routs/auth.routes'))
app.use('/api/participant', require('./routs/participant.routes'))
app.use('/api/organizer', require('./routs/organizer.routes'))
app.use('/api/competition', require('./routs/competition.routes'))
app.use('/api/user', require('./routs/user.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT} ...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()