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


/// Ellipsis
Template.articlebody.onRendered(function(){
this.$('.articlebody').ellipsis({
  lines: 3,             // force ellipsis after a certain number of lines. Default is 'auto'
  ellipClass: 'ellip',  // class used for ellipsis wrapper and to namespace ellip line
  responsive: true      // set to true if you want ellipsis to update on window resize. Default is false
});
});




Template.news.helpers({
  news:function(){
    return News.find({},{sort: {},  limit:Session.get("articleLimit")});
      // return News.find({limit:Session.get("articleLimit")});
  }
});

Template.newsSmall.helpers({
  news:function(){
    return News.find({},{sort: {},  limit:30});
      // return News.find({limit:Session.get("articleLimit")});
  },
  noImg:function(){
      if(this.image){
        var imageString = String(this.image)
        if (imageString.indexOf("//cts.re") >= 0 || imageString.indexOf("//www.emailwire.") >= 0){
          return true;
        console.log(imageString);
          }
          else{
        return false;
              }
      }
      else{
        return true;
      }
  }

});


/// infiniscroll
Session.set("articleLimit",8);
lastScrollTop = 0;
$(window).scroll(function(event){
  // test if we are near the bottom of the window
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
    // whre are we in the page
    var scrollTop = $(this).scrollTop();
    // test if we are going down
    if (scrollTop > lastScrollTop){
      Session.set("articleLimit", Session.get("articleLimit") + 4);
    }
    lastScrollTop = scrollTop
  }
});
