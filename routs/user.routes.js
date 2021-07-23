const { Router } = require('express')
const User = require('../models/User')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: '❌ Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: '❌ Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router