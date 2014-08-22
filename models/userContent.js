var State = require('ampersand-state')

var bool = ['true', 'false']

var UserContent = State.extend({
  props: {
    rel: {
      type:'string',
      required: true,
      values: ['foo']
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
    var allowed = {
        foo: bool
      }
    
    if (allowed[model.rel].indexOf(model.value) === -1) {
      throw new Error('value not allowed for ' + model.rel + ': "' + model.value +'". Allowed values: ' + allowed[model.rel].map(function (x) { return '"'+x+'"'}).join(', '))
    }
  }

})
