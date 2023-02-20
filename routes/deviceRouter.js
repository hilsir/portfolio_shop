const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
//для оценок
// router.post('/:id/rate', deviceController.postRate)
// router.get('/:id/rate', deviceController.getRate)
// router.put('/:id/rate', deviceController.putRate)
module.exports = router