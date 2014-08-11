var $ = require('jquery')
var _ = require('underscore')

var HomeModel = require('./models/home')

var root = 'http://dev.api.bestnestapp.com/'
//var root = 'http://localhost:9001/'
var demoMode = true

var labels = {
  'utility_estimates': 'utilities',
  'violations': 'violations',
  'schools': 'schools'
}
var hasDetail = {
  'utilities': false,
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
    if (dataset === 'owner') {
      owner.id = json[dataset].id
      owner.name = json[dataset].name
      owner.streetAddress = json[dataset].address
      owner.city = json[dataset].city
      owner.state = json[dataset].state
      owner.phonePlain = json[dataset].phone
      owner.phoneFormatted = formatPhone(json[dataset].phone)
    }
    else {
      var label = labels[dataset]
      if (label !== undefined) {
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
          var summary = json[dataset].summary
          structure.items = summary.map(function(item) {
            return {
              'text': item.caseType,
              'description': item.description
            }
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
  }

  if (demoMode) {
    var labelsWithData = data.map(function(item) {
      return item.label
    })

    Object.keys(order).map(function(label) {
      if (_.contains(labelsWithData, label) != true) {
        structure = {
          'id': label,
          'label': label,
          'hasDetail': hasDetail[label],
          'order': order[label],
          'items': ['dataset has yet to be loaded']
        }
        data.push(structure)
      }
    })
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
    quote: json.quote || 'This is a great place to live. I can\'t say enough nice things about the house...',
    address: json.address,
    type: json.type || 'Single family home',
    data: data.data,
    owner: data.owner
  })
  return home
}

function getHome(id) {
  return fetch('homes/'+id)
    .then(handleHomeReponse)
}

function handleCodeViolationReponse(json) {
  return json.data
}

function getCodeViolations(id) {
  return fetch('homes/'+id+'/violations')
    .then(handleCodeViolationReponse)
}

function handleLandlordResponse(json) {
  var landlord = {
    id: json.id,
    name: json.name,
    data: json.data
  }
  return landlord
}

function getLandlord(id) {
  return fetch('landlords/'+id)
    .then(handleLandlordResponse)
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

function postComment(subject, name, body) {
  var data = {
    subject: subject,
    name: name,
    body: body
  }

  return $.ajax({
    url: root + 'comments',
    dataType: 'json',
    data: JSON.stringify(data),
    type: 'POST',
    contentType: 'application/json'
  }).then(function (body, state, xhr) {
    // don't be fooled: jquery promises aren't real promises
    // ES Promises only have 1 value, not 3 :/
    if (xhr.state !== 201) {
      throw new Error('posting comment was not successful')
    }
  })
}

module.exports.getCodeViolations = getCodeViolations
module.exports.getLandlord = getLandlord
module.exports.getHome = getHome
module.exports.search = search
module.exports.postComment = postComment