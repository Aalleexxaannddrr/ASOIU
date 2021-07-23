const { Schema, model, Types } = require('mongoose')

const Competition = new Schema({
    name: { type: String, required: true },
    organizer_id: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    addres: { type: String, required: true },
    age_category: { type: String, required: true },
    contribution: { type: String, required: true },
    game_type: { type: String, required: true },
    cover_type: { type: String, required: true },
    participants_id: { type: [String] },
})

module.exports = model('Competition', Competition)