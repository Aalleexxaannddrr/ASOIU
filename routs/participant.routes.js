const { Router } = require('express')
const Participant = require('../models/Participant')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id)
        res.json(participant)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const participants = await Participant.find()
        res.json(participants)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    try {
        const { name, birthday, passport_series, passport_number, phone_number, email } = req.body
        const participant = new Participant({
            name, birthday, passport_series, passport_number, phone_number, email
        })

        await participant.save()

        res.status(201).json({ participant })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const participant = await Participant.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(participant)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const participant = await Participant.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(participant)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router