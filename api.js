var $ = require('jquery')
var _ = require('underscore')

var HomeModel = require('./models/home')

var root = 'http://api.bestnestapp.com/'
//var root = 'http://localhost:9001/'

var labels = {
  'utility_estimates': 'utilities',
  'violations': 'violations',
}
var hasDetail = {
  'utilities': false,
  'violations': true,
}
var order = {
  'utilities': 1,
  'violations': 2,
}

function formatPhone(number) {
  return number
}

function mapHomeReponse(json) {
  var reviews = []
  var data = []
  var userContent
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
    else if (dataset === 'comments') {
      reviews = json['comments']
    }
    else if (dataset === 'userContent') {
      userContent = json['userContent']
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
      if (label === 'violations') {
        var summary = json[dataset].summary

        console.log('vio-summary', summary.length)

        if (summary.length != 0) {
          structure.items = summary.map(function(item) {
            return {
              'text': item.caseType,
              'description': item.description
            }
          })
        }
        else {
          structure.items = [{
            'text': 'This home has no code violations',
            'description': ''
          }]
          structure.hasDetail = false
        }
      }
      data.push(structure)
    }
  }

  data.push({
    'id': 'utilities',
    'label': 'Utility Cost Estimates',
    'hasDetail': true,
    'order': 1,
    'items': ['Annual cost of energy usage']
  })

  console.log('data', data)

  return {
    'reviews': reviews,
    'userContent': userContent,
    'data': data,
    'owner': owner
  }
}

function handleHomeReponse(json) {
  var data = mapHomeReponse(json.data)
  var home = new HomeModel({
    id: json.id,
    address: json.address,
    type: json.type || 'Single family home',
    reviews: data.reviews,
    userContent: data.userContent,
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
    data: JSON.stringify(data),
    type: 'POST',
    contentType: 'application/json'
  }).then(function (body, state, xhr) {
    // don't be fooled: jquery promises aren't real promises
    // ES Promises only have 1 value, not 3 :/
    if (xhr.status !== 201) {
      throw new Error('posting comment was not successful')
    }
  })
}

function postUserContent(homeId, model) {
  if (!model.isValid()) {
    throw new Error('invalid model')
  }

  return $.ajax({
    url: root + 'homes/' + homeId + '/data',
    data: JSON.stringify(model.toJSON()),
    type: 'POST',
    contentType: 'application/json'
  }).then(function (body, state, xhr) {
    // don't be fooled: jquery promises aren't real promises
    // ES Promises only have 1 value, not 3 :/
    if (xhr.status !== 201) {
      throw new Error('posting content was not successful')
    }
  })
}

module.exports.getCodeViolations = getCodeViolations
module.exports.getLandlord = getLandlord
module.exports.getHome = getHome
module.exports.search = search
module.exports.postComment = postComment
module.exports.postUserContent = postUserContent
