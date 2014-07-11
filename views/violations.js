var AmpersandView = require('ampersand-view')
var fs = require('fs')

var ViolationView = AmpersandView.extend({
  template: fs.readFileSync(__dirname +'/../templates/violations.html','utf8')
})

module.exports = ViolationView
