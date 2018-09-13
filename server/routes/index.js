var express = require('express');
var router = express.Router();
const { isLogin } = require('../middlewares/isLogin')
const { createQoutes, deleteQoutes, editQoutes, allQoutes} = require('../controllers/qoutesController')

router.post('/', isLogin, createQoutes);
router.delete('/:id', isLogin, deleteQoutes);
router.get('/', allQoutes)


module.exports = router;
