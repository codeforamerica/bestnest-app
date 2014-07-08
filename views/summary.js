var AmpersandView = require('ampersand-view')
var fs = require('fs')

var SummaryView = AmpersandView.extend({
  template: fs.readFileSync(__dirname +'/../templates/summary.html','utf8')
})

module.exports = SummaryView
