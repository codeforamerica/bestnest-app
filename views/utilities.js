var AmpersandView = require('ampersand-view')
var fs = require('fs')

var UtilitiesView = AmpersandView.extend({
  template: fs.readFileSync(__dirname +'/../templates/utilities.html','utf8')
})

module.exports = UtilitiesView
