const app = require('express')();

app.get('/', (req, res) => {
  res.json({ message: 'Docker is pretty easy 🐳' });
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log('Docker server listening on http://localhost:' + port)
);
