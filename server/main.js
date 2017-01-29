import { Meteor } from 'meteor/meteor';
// News = new Mongo.Collection("news");

Meteor.startup(() => {
  // code to run on server at startup

     if (News.find().count() === 0) {
         var data = JSON.parse(Assets.getText("news.json"));
         results = data.results
         results.forEach(function (item, index, results) {
             News.insert(item);
         })
     }
     if (Exports.find().count() === 0) {
         var data = JSON.parse(Assets.getText("exportdata.json"));
         data.forEach(function (item, index, results) {
             Exports.insert(item);
         })

    }

});


  Meteor.publish('news', function newsPublication() {
    return News.find();
  });

  Meteor.publish('exports', function exportsPublication() {
    return Exports.find();
  });
