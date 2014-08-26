var AmpersandModel = require('ampersand-model')
var Home = AmpersandModel.extend({
  props: {
    id: 'string',
    address: 'string',
    type: 'string',
    reviews: 'object',
    userContent: 'object',
    data: 'object',
    owner: 'object'
  }
})

module.exports = Home
