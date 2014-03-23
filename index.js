express = require('express');
app = express();

app.use(express.static(__dirname + '/app'))
app.use(express.static(__dirname + '/app/views'))

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server started at port ' + port);