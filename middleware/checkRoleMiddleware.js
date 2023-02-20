//ПРОВЕРКА НА правильность данных
const jwt = require('jsonwebtoken')
module.exports = function (role) {
    return function (req, res, next) {
        //запрос от клиента? // OPTIONS какой то тип запроса
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]//тип токена и токен в одной строке// строка из фарша jwt
            if (!token) {
                return res.status(401).json({message: "НЕ АВТОРИЗАВАН!!!"})
            }
            //проверка токена на валидность //декадированый токен
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role){
                return res.status(403).json({message: "НЕТ ДОСТУПА!!!"})
            }
            //Тоже работает "вроде" // не трогать!
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "НЕ АВТОРИЗАВАН!!!"})
        }
    }
}