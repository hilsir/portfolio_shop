//модуль dotenv
require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const modeles = require('./models/models')
//он для исрправления багв экспреса//полеучение ресурсов к другому серверу
const cors = require('cors')
//поле файлс для картинок (и ещё чегот)
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
//работа с ошибками
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

//взять порт для бд из env. если нет то 5000
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')

//cors (библиотека)
app.use(cors())
//читать получаемые данные через json?
app.use(express.json())
//файлы из папки static выдовать как статику (фул картинка) //__dirname локальная дериктория
app.use(express.static(path.resolve(__dirname,'static')))
//возможность работы с файлами
app.use(fileUpload({}))
//URL   //глав запросник
app.use('/api', router)
// //при подключении
// app.get('/', (req, res) => {
//     //сообщение пользователю
//     res.status(200).json({message: 'WORKING!!!'})
// })

//регистрация ошибок всегда в самом конце Middleware
// в нём next т.к на нём работа прекращяется
app.use(errorHandler)


//функция для подключения дб
const start = async () => {
    try {
        //подключение к бд
        await sequelize.authenticate()
        //сверяет бд со схемой данных
        await sequelize.sync()
        //старт
        app.listen(PORT, () => console.log('Server started on port ' + PORT))
    } catch (e) {
        console.log(e)

    }
}

start()
