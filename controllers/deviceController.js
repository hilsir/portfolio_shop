const uuid = require('uuid')
//адаптирует путь в ос
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        let {name, price, rating, brandId, typeId, info} = req.body
        try {
            const {img} = req.files
            //генератор id + jpg
            let fileName = uuid.v4() + ".jpg"
            //файл с этим именем перетащить в папку static
            //path адаптирует расположение
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            //рейтинг поумолчанию
            rating = 1;

            const device = await Device.create({name, price, rating,  brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //функция для получения всех девайсов
    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            //вернуть с цифрой (количество товаров  всего)
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }


    //получение одного элемента
    async getOne(req, res) {
        //console.log("!!!!!!!!!!!!!!!!!!!юзер " +user.id+ " юзер!!!!!!!!!!!!!!!!!!!") // НЕ ЗАБЫТЬ КОПИРОВАТЬ В КОРЗИНУ И СИСТЕМУ ОЦЕНОК
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        //console.log("test"); // true
        console.log(device.dataValues)
        return res.json(device)

    }

    //лайки // RIP
    // async postRate(req, res) {return res.json()}
    // async getRate(req, res) {return res.json()}
    // async putRate(req, res) {return res.json()}
}

module.exports = new DeviceController()