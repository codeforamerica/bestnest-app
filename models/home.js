var AmpersandModel = require('ampersand-model')
var Home = AmpersandModel.extend({
  props: {
    id: 'string',
    address: 'string',
    type: 'string',
    reviews: 'object',
    data: 'object',
    owner: 'object'
  }
})

module.exports = Home
