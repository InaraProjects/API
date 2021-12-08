const app = require('express')();
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');

if (process.env.DEBUG) {
  app.use(morgan('dev'));
}

require('express-ws')(app);

fs.readdir('./routes', (err, files) => {
  files.map(file => {
    if (file.includes('.js')) {
      app.use('/', require('./routes/' + file));
    } else {
      app.use('/' + file, require('./routes/' + file));
    }
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server listening...'));
