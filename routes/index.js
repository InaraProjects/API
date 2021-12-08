const { Router } = require('express');
const cameras = require('../lib/cameras');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello!',
    paths: {
      cameras: '/cameras',
    },
  });
});

router.ws('/', (ws, req) => {
  ws.send(
    JSON.stringify({
      message: 'Connection successfully established, Waiting for commands...',
    })
  );

  ws.on('message', msg => {
    const { command } = JSON.parse(msg);

    if (!command || command.length < 1) {
      return ws.send(
        JSON.stringify({
          message: 'Missing command',
        })
      );
    }

    if (command === 'cameras') {
      ws.send(JSON.stringify(cameras));
    }
  });
});

module.exports = router;
