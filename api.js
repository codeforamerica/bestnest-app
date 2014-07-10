var $ = require('jquery')
var HomeModel = require('./models/home')

var root = 'http://www.corsproxy.com/api.dev.bestnestapp.com/'

function fetch(endpoint) {
  return $.ajax({
    url: root + endpoint,
    dataType: 'json'
  })
}

function homeModelFromJSON(json) {
  var data = {
    id: json.id,
    quote: 'string',
    address: json.address,
    type: 'string',
    data: [],
    owner: {}
  }
  var home = new HomeModel(data)
  return home
}

function getHome(id) {
  return fetch('buildings/'+id)
    .then(homeModelFromJSON)
}

function search(text, cb) {
    console.log('Search currently not implemented, good luck finding', text)
}

module.exports.getHome = getHome
module.exports.search = search
