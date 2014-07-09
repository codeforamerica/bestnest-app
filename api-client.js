var $ = require('jquery')

var Home = require('./models/home')

function homeFromJSON(json) {
  var json = JSON.parse(json)
  var data = {
    id: json.id,
    quote: 'string',
    address: json.address,
    type: 'string',
    data: [],
    owner: {}
  }
  var home = new Home(data)
  console.log('home', home)
  return home
}

var APIClient = function() {
  var APIRoot = 'http://www.corsproxy.com/bestnest-api-dev.herokuapp.com/'
  var fetch = function(endpoint) {
    return $.ajax({
      url: APIRoot + endpoint
    })
  }

  return {
    fetch: fetch,
    getHome: function(id) {
      fetch('buildings/'+id)
        .then(homeFromJSON)
    },
    search: function(text, cb) {
      console.log('Search currently not implemented, good luck finding', text)
    }
  }
}

module.exports = APIClient
