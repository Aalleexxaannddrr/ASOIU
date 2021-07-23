const { Schema, model, Types } = require('mongoose')

const Participant = new Schema({
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    passport_series: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
})

module.exports = model('Participant', Participant)