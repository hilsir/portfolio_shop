const {Brand} = require("../models/models");
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        //сохдаём тип // функция асинхроная
        const brand = await Brand.create({name})
        // в ответ засунуть то что создали
        return res.json({brand})
    }

    async getAll(req, res) {
        //запросить всю таблицу
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()