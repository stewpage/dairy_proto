Template.trade.helpers({

  months: function(){
    var subs = Meteor.subscribe('productexporttop');
    if (subs.ready()) {
      var months = ProductExportTop.find().fetch();
      var arrayLength = months.length;
      var monthlist = [];
      for (var i = 0; i < arrayLength; i++) {
        if(monthlist.indexOf(months[i].month) < 0){
        monthlist.push(months[i].month);
      }
      else{

      }
        }
      // console.log(monthlist);
      // console.log(monthlist.sort());
      return monthlist.sort();
    } else {
      return;
    }
    },

    products: function(){

      var subs = Meteor.subscribe('productexporttop');
      if (subs.ready()) {
        var products = ProductExportTop.find().fetch();
        var arrayLength = products.length;
        var productlist = [];
        for (var i = 0; i < arrayLength; i++) {
          if(productlist.indexOf(products[i].product) < 0){
          productlist.push(products[i].product);
          }
        else{
          //do nothing
        }
      }
        // console.log(monthlist);
        // console.log(monthlist.sort());
        return productlist.sort();
      } else {
        return;
      }
      },

    myCollection: function(){

      var subs = Meteor.subscribe('exportsfull');
      if (subs.ready()) {

        console.log("exports ready");
        return ExportsFull.find({"year":Session.get('donutmonth')}).fetch()[0].data
      } else {
        return;
      }
    },

    // export table settings
    settings: function () {
        return {
           showFilter:false,
          showNavigationRowsPerPage:false,
          rowsPerPage:10,
          fields: [
            { key: 'country',  label: 'Country', sortOrder: 1, sortDirection: 'ascending'},
    { key: 'exports', label: 'Yearly export value (USD)', sortOrder: 0, sortDirection: 'descending' }
                  ]
        };
    }



});

Template.registerHelper('session',function(input){
    return Session.get(input);
});

Template.trade.events({

    "change #month-select": function (event, template) {
        var month = $(event.currentTarget).val();
        Session.set('donutmonth', month);

    },
    "change #product-select": function (event, template) {
        var product = $(event.currentTarget).val();
        Session.set('donutproduct', product);
        console.log(Session.get('donutproduct'))

    },
});
