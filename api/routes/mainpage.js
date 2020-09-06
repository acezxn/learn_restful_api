const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    abc:'welcome to mainpage'
  });
});
//export route get post rule
module.exports = router;
