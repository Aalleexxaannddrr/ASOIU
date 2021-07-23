const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля - 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: '❌ Некорректные данные при регистрации'
                })
            }
            const { email, password, isOrganizer, name, birthday, passport_series, passport_number, phone_number, gender } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                res.status(400).json({ message: '❌Такой пользователь уже существует' })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword, isOrganizer, name, birthday, passport_series, passport_number, phone_number, gender })
            await user.save()
            res.status(201).json({ message: '✔️Пользователь создан' })
        } catch (e) {
            res.status(500).json({ message: '❌ Что-то пошло не так, попробуйте снова' })
        }
    })

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: '❌ Некорректные данные при авторизации'
                })
            }
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: '❌ Пользователь не найден' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: '❌ Неверный пароль, попробуйте снова' })
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.json({ token, userId: user.id, isOrganizer: user.isOrganizer })
        } catch (e) {
            res.status(500).json({ message: '❌ Что-то пошло не так, попробуйте снова' })
        }
    })

module.exports = router