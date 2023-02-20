const ApiError = require('../error/ApiError')
//ошибка. запрос. ответ. (ответ middleware) // экспартируется функция middleware
module.exports = function (err, req, res, next) {
    //если класс ошибки ApiError
    if (err instanceof ApiError) {
        // возврощаем ответ со статус кодом , который будем получать из ошибки и с сообщеним ошибки
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Неприедвиденная ошибка!"})
}

