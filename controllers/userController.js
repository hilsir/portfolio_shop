const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')


const generateJwt = (id, email, role) => {
    //генерация токена    //второй пораметр ключ
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        //живёт 24ч чтоб невзломали
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
         //берём ищ тела запроса
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некоректный mail или пароль'))
        }
        //существует ли такой пароль или почка в бд?
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Такой пользватель есть'))
        }
        //хешированый пороль                  //сколько раз его хеширвать
        const hashPassword = await bcrypt.hash(password, 5)
        //создаём пользователя
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        //генерация токена
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        //этот чел существует?
        const user = await User.findOne({where: {email}})
        //console.log("!!!!!!!!!!!!!!!!!!!юзер " +user.id+ " юзер!!!!!!!!!!!!!!!!!!!")
        if (!user) {
            return next(ApiError.internal('Сей пользоваетля несуществует'))
        }
        //пароль робит?               // сравнить пароли
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Сей ПАРОЛЬ несуществует'))
        }
        //создаём токен
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        console.log(req)
        //параметр строки запроса
        // res.json({message: "Всё робит!"})
        //сгенерировать НОВЫЙ токен ДЛЯ КЛИЕНТА
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
