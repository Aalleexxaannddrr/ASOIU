const { Router } = require('express')
const Organizer = require('../models/Organizer')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.params.id)
        res.json(organizer)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const organizers = await Organizer.find()
        res.json(organizers)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const { name, birthday, passport_series, passport_number, phone_number, email } = req.body
        const organizer = new Organizer({
            name, birthday, passport_series, passport_number, phone_number, email
        })

        await organizer.save()

        res.status(201).json({ organizer })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const organizer = await Organizer.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(organizer)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const organizer = await Organizer.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(organizer)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router