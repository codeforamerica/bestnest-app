var $ = require('jquery')
var Home = require('./models/home')

function homeFromJSON(json) {
  var data = {
    id: json.id,
    quote: 'string',
    address: json.address,
    type: 'string',
    data: [],
    owner: {}
  }
  var home = new Home(data)
  return home
}

var APIRoot = 'http://www.corsproxy.com/dev.bestnestapp.com/'
var fetch = function(endpoint) {
  return $.ajax({
    url: APIRoot + endpoint,
    dataType: 'json'
  })
}

var APIClient = {
  getHome: function(id) {
    return fetch('buildings/'+id)
      .then(homeFromJSON)
  },
  search: function(text, cb) {
    console.log('Search currently not implemented, good luck finding', text)
  }
}

module.exports = APIClient