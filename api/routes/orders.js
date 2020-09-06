const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    abc:'orders'
  });
});

//export route get post rule
module.exports = router;
