var AmpersandView = require('ampersand-view')
var fs = require('fs')
var _ = require('underscore')
var api = require('../api')
var $ = require('jquery')
var bliss = new (require('bliss'))

var listTemplate = bliss.compile(fs.readFileSync(__dirname +'/../templates/searchResults.html','utf8'))

var IndexView = AmpersandView.extend({
  initialize: function () {
    this.search = this.search.bind(this)
  },
  template: fs.readFileSync(__dirname +'/../templates/index.html','utf8'),
  events: {
    'keypress #address-search': 'search'
  },
  search: _.debounce(function () {
    var self = this
    api.search($(this.el).find('#address-search').val())
      .then(function (raw) { return raw.results })
      .then(listTemplate)
      .then(function (html) {
        $(self.el).children('.container').html(html)
      })
  }, 200)
})

module.exports = IndexView
