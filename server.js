const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./static'));

app.get('*', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(PORT, function() {
  console.log(`Served at http://localhost:${PORT}`);
});
