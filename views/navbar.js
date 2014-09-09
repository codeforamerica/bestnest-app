var AmpersandView = require('ampersand-view')
var fs = require('fs')
var _ = require('underscore')
var $ = require('jquery')
var bliss = new (require('bliss'))

var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/navbar.html','utf8'))
var searchResultsTemplate = bliss.compile(fs.readFileSync(__dirname +'/../templates/searchResults.html','utf8'))

var viewConfig = {}
viewConfig['index'] = {
  back: false,
  searchIcon: false,
  searchBar: true,
  done: false
}
viewConfig['summary'] = {
  back: true,
  searchIcon: true,
  searchBar: false,
  done: false,
  title: function (home) {
    return home.address
  }
}
viewConfig['utilities'] = {
  back: true,
  searchIcon: true,
  searchBar: false,
  done: false,
  title: function () {
    return 'Approximate Energy Cost'
  }
}
viewConfig['violations'] = {
  back: true,
  searchIcon: true,
  searchBar: false,
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
  searchIcon: true,
  searchBar: false,
  done: false,
  title: function () {
    return 'Reviews'
  }
}
viewConfig['leaveReview'] = {
  back: true,
  searchIcon: false,
  searchBar: false,
  done: true,
  title: function() {
    return 'Leave a review'
  }
}
viewConfig['questions'] = {
  back: true,
  searchIcon: true,
  searchBar: false,
  done: false,
  title: function () {
    return 'Questions'
  }
}
viewConfig['landlord'] = {
  back: true,
  searchIcon: true,
  searchBar: false,
  done: false,
  title: function (landlord) {
    return 'Owner'
  }
}

var NavbarView = AmpersandView.extend({
  initialize: function () {
    console.log('navbar init')
    this.render = this.render.bind(this)
  },
  events: {
    'keypress #address-search': 'addressSearch',
    'click .back': 'goBack',
    'click .search': 'goSearch'
  },
  render: function (viewName, id) {
    var view = this
    view.el = view.el || document.createElement('nav')
    $(view.el).addClass('nav navbar')

    if (viewName == 'landlord') {
      return api.getLandlord(id)
        .then(function (landlord) {
          var config = viewConfig[viewName]
          var html = template(landlord, config)
          $(view.el).html(html)
        })
    }
    else if (viewName == 'index') {
      var config = viewConfig[viewName]
      var html = template(viewName, config)
      $(view.el).html(html)
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
  goSearch: function () {
    window.location.hash = "#"
  },
  addressSearch: function () {
    var self = this
    var address = $(this.el).find('#address-search').val()
    api.search(address)
      .then(function (raw) { return raw.results })
      .then(searchResultsTemplate)
      .then(function (html) {
        $('.search-results').html(html)
      })
  }
})

module.exports = NavbarView
