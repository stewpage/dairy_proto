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

    if (ExportsFull.find().count() === 0) {
        var data = JSON.parse(Assets.getText("yearly_export_full.json"));
        data.forEach(function (item, index, results) {
            ExportsFull.insert(item);
        })
   }

   if (ExportsHist.find().count() === 0) {
       var data = JSON.parse(Assets.getText("exporthist.json"));
       data.forEach(function (item, index, results) {
           ExportsHist.insert(item);
       })
     }
     if (ProductExportTop.find().count() === 0) {
         var data = JSON.parse(Assets.getText("yearly_export_trimmed_top.json"));
         data.forEach(function (item, index, results) {
             ProductExportTop.insert(item);
         })
       }
       if (ImportsFull.find().count() === 0) {
           var data = JSON.parse(Assets.getText("yearly_import_full.json"));
           data.forEach(function (item, index, results) {
               ImportsFull.insert(item);
           })
      }

      if (ImportsHist.find().count() === 0) {
          var data = JSON.parse(Assets.getText("importhist.json"));
          data.forEach(function (item, index, results) {
              ImportsHist.insert(item);
          })
        }
        if (ProductImportTop.find().count() === 0) {
            var data = JSON.parse(Assets.getText("yearly_import_trimmed_top.json"));
            data.forEach(function (item, index, results) {
                ProductImportTop.insert(item);
            })
          }
});


  Meteor.publish('news', function newsPublication() {
    return News.find();
  });

  Meteor.publish('exportsfull', function exportsPublication() {
    return ExportsFull.find();
  });

  Meteor.publish('exportshist', function exportsPublication() {
    return ExportsHist.find();
  });

  Meteor.publish('productexporttop', function exportsPublication() {
    return ProductExportTop.find();
  });

  Meteor.publish('importsfull', function importsPublication() {
    return ImportsFull.find();
  });

  Meteor.publish('importshist', function importsPublication() {
    return ImportsHist.find();
  });

  Meteor.publish('productimporttop', function importsPublication() {
    return ProductImportTop.find();
  });
