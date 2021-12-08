const { Router } = require('express');
const cameras = require('../../lib/cameras');

const router = Router();

router.get('/', (req, res) => {
  res.json(cameras);
});

module.exports = router;
