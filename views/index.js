var AmpersandView = require('ampersand-view')
var fs = require('fs')
var bliss = new (require('bliss'))

var IndexView = AmpersandView.extend({
  initialize: function () {
  },
  template: fs.readFileSync(__dirname +'/../templates/index.html','utf8'),
})

module.exports = IndexView
