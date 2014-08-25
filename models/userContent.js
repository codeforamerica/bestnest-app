var State = require('ampersand-state')

var bool = ['true', 'false']

var allowed = {
  'pets-allowed': ['Yes', 'No', 'Not sure'],
  'lease': ['Short-term', 'Year', 'Not sure'],
  'heat': ['Gas', 'Electric', 'Not sure']
}

var UserContent = State.extend({
  props: {
    rel: {
      type:'string',
      required: true,
      values: Object.keys(allowed)
    },
    value: {
      type: 'string',
      required: true
    }
  },
  initialize: function () {
    this.isValid()
  },
  validate: function (model) {
    
    if (allowed[model.rel].indexOf(model.value) === -1) {
      throw new Error('value not allowed for ' + model.rel + ': "' + model.value +'". Allowed values: ' + allowed[model.rel].map(function (x) { return '"'+x+'"'}).join(', '))
    }
  }

})

module.exports = UserContent
module.exports.allowed = allowed