var AmpersandView = require('ampersand-view')
var fs = require('fs')
var bliss = new (require('bliss'))
var $ = require('jquery')
var UserContent = require('../models/userContent')

var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/questions.html','utf8'))

var QuestionsView = AmpersandView.extend({
  initialize: function () {
    this.render = this.render.bind(this)
    this.sendContent = this.sendContent.bind(this)
  },
  events: {
    'click button': 'sendContent'
  },
  render: function () {
    var view = this
    view.el = view.el || document.createElement('div')
    var html = template()
    return $(view.el).html(html)
  },
  sendContent: function (e) {
    var button = $(e.target)
    var content = new UserContent({rel: button.parent().attr('rel'), value: button.text()})
    api.postUserContent(this.homeId, content)
  }
})

module.exports = QuestionsView
