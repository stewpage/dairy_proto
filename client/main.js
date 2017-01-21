import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// News = new Mongo.Collection("news");
Router.route('/', {
});
Router.route('/price', {
    template: 'price'
});
Router.route('/market_overview', {
    template: 'market'
});
Router.route('/production', {
    template: 'production'
});

Router.route('/consumption', {
    template: 'consumption'
});

Router.route('/trade', {
    template: 'consumption'
});

Router.route('/suppliers', {
    template: 'consumption'
});

Router.route('/geography', {
    template: 'consumption'
});
Router.route('/news', {
    template: 'news'
});
Router.route('/policy', {
    template: 'consumption'
});
// import './main.html';

Template.news.helpers({
  news:function(){
    return News.find();
  }
});

// Template.articlebody.onRendered(function(){
// this.$("#articlebody").dotdotdot(); // This only runs on the first element
// this.$(".articlebody").dotdotdot(); // This runs on all elements
// console.log('foofoo')
// });
Template.articlebody.onRendered(function(){
this.$('.articlebody').ellipsis({
  lines: 3,             // force ellipsis after a certain number of lines. Default is 'auto'
  ellipClass: 'ellip',  // class used for ellipsis wrapper and to namespace ellip line
  responsive: true      // set to true if you want ellipsis to update on window resize. Default is false
});
});
