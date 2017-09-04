var
      express = require('express')
    , request = require('request')
  	, async   = require('async')
  	, Config  = require('../modules/Config')
    , Utils   = require('../modules/Utils')
    , router  = express.Router()
;

router.get('/', function(req, res) {

  request.get('https://api.mercadolibre.com/sites/MLA/search?q='+req.query.q, function(err, httpResponse, body) {

    if (err) {
      console.log(err);
      res.status(502).end();
      return;
    }

    var json = JSON.parse(body);

    if (json.results.length==0) {
      res.status(404).end();
      return;
    }

    var response = Utils.processResponse(json, Config.RESULT_LIMITS);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(response);
  });

});

module.exports = router;