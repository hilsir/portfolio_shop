//импорт // require - импорт node //{Sequelize} то что вытаскиваем
const {Sequelize} = require('sequelize')
//конфигурация
module.exports = new Sequelize(
    process.env.DB_NAME,//название бд
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        //СУБД
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)