var $ = require('jquery')
var HomeModel = require('./models/home')

var root = 'http://dev.api.bestnestapp.com/'
var demoMode = true

var labels = {
  'utility_estimates': 'utilities',
  'code_violations': 'violations',
  'schools': 'schools'
}
var hasDetail = {
  'utilities': true,
  'violations': true,
  'schools': false,
  'transit': false
}
var order = {
  'utilities': 1,
  'violations': 2,
  'schools': 3,
  'transit': 4
}

function formatPhone(number) {
  return number
}

function mapHomeReponse(json) {
  var data = []
  var owner = {}

  for (dataset in json) {
    if (dataset === 'owner_information') {
      owner.name = json[dataset].name
      owner.streetAddress = json[dataset].street_address
      owner.city = json[dataset].city
      owner.state = json[dataset].state
      owner.phonePlain = json[dataset].phone
      owner.phoneFormatted = formatPhone(json[dataset].phone)
    }
    else {
      var label = labels[dataset]
      structure = {
        'id': label,
        'label': label,
        'hasDetail': hasDetail[label],
        'order': order[label],
        'items': []
      }
      if (label === 'utilities') {
      }
      else if (label === 'violations') {
        var violations = json[dataset]
        violations.map(function(item) {
          structure.items.push({
            'text': item.description,
            'description': item.date_issued
          })
        })
      }
      else if (label === 'schools') {
        var schools = json[dataset]
        structure.items = [
          schools['elementary'],
          schools['middle'],
          schools['high']
        ]
      }
      data.push(structure)
    }
  }

  console.log('demoMode', demoMode)
  console.log('data', data)

  if (demoMode && data.length === 0){
    console.log('yo')
    dataTypes = ['utilities', 'violations', 'schools', 'transit']
    dataTypes.map(function(label) {
      structure = {
        'id': label,
        'label': label,
        'hasDetail': hasDetail[label],
        'order': order[label],
        'items': ['dataset has yet to be loaded']
      }
      data.push(structure)
    })
    console.log('demoMode data', data)
  }

  return {
    'data': data,
    'owner': owner
  }
}

function handleHomeReponse(json) {
  var data = mapHomeReponse(json.data)
  var home = new HomeModel({
    id: json.id,
    quote: json.quote || 'quote string',
    address: json.address,
    type: json.type || 'type string',
    data: data.data,
    owner: data.owner
  })
  return home
}

function getHome(id) {
  return fetch('homes/'+id)
    .then(handleHomeReponse)
}

function search(text) {
  return fetch('search?q=' + encodeURIComponent(text))
}

function fetch(endpoint) {
  return $.ajax({
    url: root + endpoint,
    dataType: 'json'
  })
}
module.exports.getHome = getHome
module.exports.search = search
