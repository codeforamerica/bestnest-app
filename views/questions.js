var AmpersandView = require('ampersand-view')
var fs = require('fs')
var bliss = new (require('bliss'))
var $ = require('jquery')

var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/questions.html','utf8'))

var LeaveReviewView = AmpersandView.extend({
  initialize: function () {
    this.render = this.render.bind(this)
  },
  render: function (landlordId) {
    var view = this
    view.el = view.el || document.createElement('div')
    return api.getLandlord(landlordId)
      .then(function (model) {
        console.log('model', model)
        var html = template(model)
        $(view.el).html(html)
      })
  }
})

module.exports = LeaveReviewView
