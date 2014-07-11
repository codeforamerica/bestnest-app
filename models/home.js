var AmpersandModel = require('ampersand-model')
var Home = AmpersandModel.extend({
  props: {
    id: 'string',
    quote: 'string',
    address: 'string',
    type: 'string',
    data: 'object',
    owner: 'object'
  }
})

module.exports = Home
