var AmpersandView = require('ampersand-view')
var fs = require('fs')
var bliss = new (require('bliss'))

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/summary.html','utf8'))

var SummaryView = AmpersandView.extend({
  initialize: function () {
    this.data = {
      home: {
        quote: 'A great place!',
        address: '508 Beck Ave',
        type: 'Single family home',
        data: [
          {
            id: 'utilites',
            label: 'Utilities',
            hasDetail: true,
            order: 1,
            items: [
              {text: '$90 / month average electricity'}, {text:'$35 / month average water'}
            ]
          },
          {
            id: 'violations',
            label: 'Code Violations',
            hasDetail: true,
            order: 2,
            items: [
              {
                text: 'Abandoned/inoperable vehicles',
                description: '2014-09-12'
              },
              {
                text: 'Stuff left lying around',
                description: '2014-09-12'
              }
            ]
          },
          {
            id: 'schools',
            label: 'Schools',
            hasDetail: false,
            order: 3,
            items: ['Mike Elementary', 'East Ridge Middle', 'East Ridge High']
          },
          {
            id: 'transit',
            label: 'Transit',
            hasDetail: false,
            order: 4,
            items: ['2 bus stops within a 5 minute walk']
          }
        ],
        owner: {
          name: 'Gina Mercovich',
          streetAddress: '101 11th Street',
          city: 'Chattanooga',
          state: 'TN',
          phonePlain: '4153020280',
          phoneFormated: '(415) 302-0208'
        }
      }
    }
  },
  template: function (view) {
    return template(view.data.home)
  }
})

module.exports = SummaryView
