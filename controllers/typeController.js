const {type, Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    //создать
    async create(req, res) {
        const {name} = req.body
        //сохдаём тип // функция асинхроная
        const type = await Type.create({name})
        // в ответ засунуть то что создали
        return res.json({type})
    }

//получить
    async getAll(req, res) {
        //запросить всю таблицу
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()