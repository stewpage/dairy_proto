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
    //  if (Exports.find().count() === 0) {
    //      var data = JSON.parse(Assets.getText("exportdata.json"));
    //      data.forEach(function (item, index, results) {
    //          Exports.insert(item);
    //      })

    // }
    if (ExportsFull.find().count() === 0) {
        var data = JSON.parse(Assets.getText("exportdata_full.json"));
        data.forEach(function (item, index, results) {
            ExportsFull.insert(item);
        })
   }
   if (ExportsHist.find().count() === 0) {
       var data = JSON.parse(Assets.getText("exporthist.json"));

       results = data.exporthist
       results.forEach(function (item, index, results) {
           ExportsHist.insert(item);
       })
     }
     if (ProductExportTop.find().count() === 0) {
         var data = JSON.parse(Assets.getText("product_export_top.json"));
         data.forEach(function (item, index, results) {
             ProductExportTop.insert(item);
         })
       }
});


  Meteor.publish('news', function newsPublication() {
    return News.find();
  });

  // Meteor.publish('exports', function exportsPublication() {
  //   return Exports.find();
  // });

  Meteor.publish('exportsfull', function exportsPublication() {
    return ExportsFull.find();
  });

  Meteor.publish('exportshist', function exportsPublication() {
    return ExportsHist.find();
  });

  Meteor.publish('productexporttop', function exportsPublication() {
    return ProductExportTop.find();
  });
