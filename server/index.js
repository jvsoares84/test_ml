var
	  express = require('express')
	, http    = require('http')
	, app     = express()
;

var items = require('./routers/items');
app.use('/api/items', items);

var itemsId = require('./routers/itemsId');
app.use('/api/items', itemsId);

app.use(express.static('public'));

var HTTP_PORT = 80;
var portParam = process.argv.indexOf("-p");
if (portParam>-1 && !isNaN(process.argv[portParam+1]))
	HTTP_PORT = process.argv[portParam+1];


http.createServer(app).listen(HTTP_PORT,function() {
  console.log('Listening HTTP on port ' + HTTP_PORT);
});
