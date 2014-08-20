var AmpersandView = require('ampersand-view')
var fs = require('fs')
var _ = require('underscore')
var $ = require('jquery')
var bliss = new (require('bliss'))

var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/navbar.html','utf8'))

var NavbarView = AmpersandView.extend({
  initialize: function () {
    console.log('navbar init')
    this.render = this.render.bind(this)
  },
  events: {
    'keypress .back': 'goBack',
    'keypress .search': 'search'
  },
  render: function (viewName, id) {
    var view = this
    view.el = view.el || document.createElement('nav')
    $(view.el).addClass('nav navbar')

    var viewConfig = {}
    viewConfig['summary'] = {
      back: false,
      search: true,
      done: false,
      title: function (home) {
        return home.address
      }
    }
    viewConfig['violations'] = {
      back: true,
      search: true,
      done: false,
      title: function (home) {
        var text
        _.each(home.data, function(data) {
          if (data.id == 'violations') {
            text = 'Violations (' + data.items.length + ')'
          }
        })
        return text
      }
    }
    viewConfig['reviews'] = {
      back: true,
      search: true,
      done: false,
      title: function () {
        return 'Reviews'
      }
    }
    viewConfig['leaveReview'] = {
      back: true,
      search: false,
      done: true,
      title: function() {
        return 'Leave a review'
      }
    }
    viewConfig['questions'] = {
      back: true,
      search: true,
      done: false,
      title: function () {
        return 'Questions'
      }
    }
    viewConfig['landlord'] = {
      back: true,
      search: true,
      done: false,
      title: function (landlord) {
        return 'Owner' 
      }
    }

    if (viewName == 'landlord') {
      return api.getLandlord(id)
        .then(function (landlord) {
          var config = viewConfig[viewName]
          var html = template(landlord, config)
          $(view.el).html(html)
        })
    }
    else {
      return api.getHome(id)
        .then(function (model) {
          var config = viewConfig[viewName]
          var home = model.toJSON()
          var html = template(home, config)
          $(view.el).html(html)
        })
    }

  },
  goBack: function () {
    window.history.back()
  },
  search: function () {
    console.log('search')
  }
})

module.exports = NavbarView
