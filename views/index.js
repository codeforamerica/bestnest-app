var AmpersandView = require('ampersand-view')
var fs = require('fs')

var IndexView = AmpersandView.extend({
  template: fs.readFileSync(__dirname +'/../templates/index.html','utf8')
})

module.exports = IndexView
