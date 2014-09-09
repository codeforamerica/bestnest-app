var AmpersandView = require('ampersand-view')
var AmpersandViewSwitcher = require('ampersand-view-switcher')
var fs = require('fs')
var bliss = new (require('bliss'))
var $ = require('jquery')

var userContentModel = require('../models/userContent')
var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/questions.html','utf8'))
var singleQuestionTemplate = bliss.compile(fs.readFileSync(__dirname +'/../templates/singleQuestion.html','utf8'))

var questionTexts = {
  'pets-allowed': 'Are pets allowed?',
  'lease': 'What type of lease is the rental?',
  'heat': 'What type of heat does the home have?'
}

var SingleQuestionView = AmpersandView.extend({
  events: {
    'click button': 'submitAnswer'
  },
  initialize: function (values) {
    this.render = this.render.bind(this)

    this.homeId = values['homeId']
    this.question = values['question']
  },
  render: function () {
    var view = this
    this.el = this.el || document.createElement('div')
    var html = singleQuestionTemplate(this.question.questionText, this.question.rel, this.question.values)
    return $(view.el).html(html)
  },
  submitAnswer: function (clickEvent) {
    console.log(this)
    button = $(clickEvent.target)
    button.addClass('selected')

    var content = new userContentModel({rel: button.parent().attr('rel'), value: button.text()})
    api.postUserContent(this.homeId, content)
  }
})

var QuestionsView = AmpersandView.extend({
  events: {
    'click button': 'nextQuestion'
  },
  initialize: function () {
    this.render = this.render.bind(this)
  },
  render: function (homeId) {
    var view = this
    var values = this.values
    view.currentPage = 0 // 0-based index because i'm lazy and going to use it directly as the index

    window.questionViews = view.questionViews = []
    var rels = Object.keys(userContentModel.allowed)
    for (i in rels) {
      rel = rels[i]
      questionText = questionTexts[rel]
      values = userContentModel.allowed[rel]
      question = {
        rel: rel,
        questionText: questionText,
        values: values
      }
      view.questionViews.push(new SingleQuestionView({'question': question, 'homeId': homeId}))
    }

    view.el = view.el || document.createElement('div')
    var html = template()
    $(view.el).html(html)

    var callback = function(i) { console.log('i', i) }

    var pageContainer = $(view.el).find('.question')[0]
    this.pageSwitcher = new AmpersandViewSwitcher(pageContainer, {
      waitForRemove: true,
      view: view.questionViews[view.currentPage],
      hide: function (oldView, newView, cb) {
        oldView.el.classList.add('animateOut');
        setTimeout(cb, 1500)
      },
      show: function (newView, oldView) {
        console.log('newView', newView)
        console.log('oldView', oldView)
      }
    })
    window.ps = this.pageSwitcher
  },
  nextQuestion: function () {
    if (this.currentPage < this.questionViews.length - 1) {
      this.pageSwitcher.set(this.questionViews[this.currentPage + 1])
      this.currentPage += 1
    }
    else {
      window.location.hash = window.location.hash.split('/').slice(0,3).join('/')
    }
  }
})

module.exports = QuestionsView
