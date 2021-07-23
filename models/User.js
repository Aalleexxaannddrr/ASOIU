const { Schema, model, Types } = require('mongoose')

const User = new Schema({
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: {type: String, required: true },
    passport_series: { type: String, required: true },
    passport_number: {type: String, required: true},
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isOrganizer: { type: Boolean, required: true },
})

module.exports = model('User', User)