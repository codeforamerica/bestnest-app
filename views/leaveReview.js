var AmpersandView = require('ampersand-view')
var fs = require('fs')
var bliss = new (require('bliss'))
var $ = require('jquery')
var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/leaveReview.html','utf8'))

var LeaveReviewView = AmpersandView.extend({
  initialize: function () {
    this.render = this.render.bind(this)
    this.leaveReview = this.leaveReview.bind(this)
  },
  events: {
    'click .leave-review': 'leaveReview'
  },
  render: function (homeId) {
    // this is wrong, it should be in a model
    this.homeId = homeId
    var username = window.localStorage.getItem('bestnest:username')
    var view = this
    view.el = view.el || document.createElement('div')
    return api.getHome(homeId)
      .then(function (model) {
        var home = model.toJSON()
        var html = template(home)
        $(view.el).html(html)
        if (username != undefined) {
          $('input.name').val(username)
        }
      })
  },
  leaveReview: function () {
    var view = this
    var subject = 'homes/' + view.homeId
    var name = $('.name', view.el).val()
    var review = $('.review', view.el).val()

    window.localStorage.setItem('bestnest:username', name)

    $(view.el).addClass('waiting')
    api.postComment(subject, name, review)
      .then(function () {

      }, function (err) {
        $('.leave-review', view.el).before('<div class="error">Could not leave review at this time</div>')
      })
      .then(function () {
        $(view.el).removeClass('waiting')
      })
  }
})

module.exports = LeaveReviewView
