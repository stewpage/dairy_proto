import { Meteor } from 'meteor/meteor';
// News = new Mongo.Collection("news");

Meteor.startup(() => {
  // code to run on server at startup

     if (News.find().count() === 0) {
         console.log("news.json to db")
        // var data = Assets.getText("news.json");
         var data = JSON.parse(Assets.getText("news.json"));
         results = data.results
         console.log(data.results[14]);

         results.forEach(function (item, index, results) {
             News.insert(item);
         })
     }
});
// import data only when Products collection is empty
