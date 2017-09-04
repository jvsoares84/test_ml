var
      express = require('express')
    , request = require('request')
  , async   = require('async')
  , Config  = require('../modules/Config')
    , Utils   = require('../modules/Utils')
    , router  = express.Router()
;

router.get('/:id', function(req, res) {

  var urls = [
      'https://api.mercadolibre.com/items/'+req.params.id
    , 'https://api.mercadolibre.com/items/'+req.params.id+'/description'
  ];

  async.map(urls, function(url, callback) {
    request(url, function(error, response, body) {
      callback(error, body);
    });
  }, function(err, results) {

    if (err) {
      console.log(err);
      res.status(502).end();
      return;
    }

    var item = JSON.parse(results[0]);
    var description = JSON.parse(results[1]);

    if ("error" in item) {
      res.status(item.status).end();
      return;
    }

    var response = {};

    response["author"] = {
        "name": Config.AUTHOR_NAME
      , "lastname": Config.AUTHOR_LASTNAME
    }

    response['item'] = Utils.getItem(item);
    response['sold_quantity'] = item.sold_quantity;
    response['description'] = description.plain_text.replace(/[\r\n]+/g," ");

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(response);
  });

});

module.exports = router;