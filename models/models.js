//Sequelize там вся инфа для подключения
const sequelize = require('../db')
//определение типа поля бд
const {DataTypes} = require('sequelize')
//первая модель (бд)                 название модели,{поля}
const User = sequelize.define('user', {
    //primaryKey первиынй ключ?   //autoIncrement авто выдача id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //уникальность unique
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    //defaultValue поумолчанию
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})
//корзина
const Basket = sequelize.define('basket', {
    //primaryKey первиынй ключ?   //autoIncrement авто выдача id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
//
const BasketDevice = sequelize.define('basket_device', {
    //primaryKey первиынй ключ?   //autoIncrement авто выдача id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
//устройства
const Device = sequelize.define('device', {
    //primaryKey первиынй ключ?   //autoIncrement авто выдача id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})
//изображение
const Type = sequelize.define('type', {
    //primaryKey первиынй ключ?   //autoIncrement авто выдача id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
//бренд
const Brand = sequelize.define('brand', {
    //primaryKey первиынй ключ?   //autoIncrement авто выдача id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
//рейтинг
const Rating = sequelize.define('rating', {
    //primaryKey первиынй ключ?   //autoIncrement авто выдача id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.STRING, unique: true, allowNull: false}
})
//
const DeviceInfo = sequelize.define('device_info', {
    //primaryKey первиынй ключ?   //autoIncrement авто выдача id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

//описания всязи таблиц друг с другом

//многие ко многим// нужен буфер //связующая таблица
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}

})
// Device.hasMany(DeviceInfo)
// DeviceInfo.belongsTo(Device)
//одна запись User содержит много записей с Basket
User.hasOne(Basket)
//карзина перенадлежит пользователю
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Device.hasMany(Rating)
Rating.belongsTo(Device)
//имеет много
Basket.hasMany(Rating)
//Принадлежит тебе
Rating.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)


//имеет много
Device.hasMany(BasketDevice)
//Принадлежит тебе
BasketDevice.belongsTo(Device)
//поле массива характеристик
Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)
//многие ко многим// нужен буфер
Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

//экспорт всех моделей
module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}