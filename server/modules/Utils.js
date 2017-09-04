var Config = require('./Config')

function processResponse(json, qty) {
    var result = {};

    result["author"] = {
        "name": Config.AUTHOR_NAME
      , "lastname": Config.AUTHOR_LASTNAME
    }

    result["categories"] = [];
    for (var i=0; i<json.filters.length; i++) {
      if (json.filters[i].id == "category")
        for (var j=0; j<json.filters[0].values[0].path_from_root.length; j++)
          result.categories.push(json.filters[0].values[0].path_from_root[j].name);
    }

    if (qty>1) {
      result["items"] = [];
      for (var i=0; i<json.results.length && i<qty; i++) {
        result.items.push(getItem(json.results[i]));
      }
    } else {
      result['item'] = getItem(json);
    }

    return result;
  }

function getItem(item) {
  var price = parseInt(item.price);
  var amount = Math.floor(price);

  var result = {
      "id": item.id
    , "title": item.title
    , "price": {
        "currency": item.currency_id
      , "amount": amount
      , "decimals": (price - amount)*100
    }
    , "picture": "pictures" in item ? item.pictures[0].url : item.thumbnail
    , "condition": item.condition
    , "free_shipping": item.shipping.free_shipping
  };

  return result;
}

var Utils = {
    processResponse: function(json, qty) {
    return processResponse(json, qty);
  }
  , getItem: function(item) {
  	return getItem(item);
  }
  , authorName: Config.AUTHOR_NAME
  , authorLastame: Config.AUTHOR_LASTNAME
  , resultLimits: Config.RESULT_LIMITS
}

module.exports = Utils;