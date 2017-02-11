Template.trade.helpers({

  milkProduct:function () {
    var converter = {'19':"foo",
    '0401':"MILK AND CREAM",
    '040140': "MILK AND CREAM, 6%-10% FAT",
    '04014000':"MILK AND CREAM, 6%-10% FAT",
    '04015000':"MILK, CREAM ETC, >10% FAT",
    '040150':"MILK AND CREAM, >10% FAT",
    '040210':"MILK AND CREAM IN POWDER,GRANULES OR OTHER SOLID FORMS, <1.5% FAT",
    '04021010':"SKIMMED MILK",
    '04021020':"MILK FOOD FOR BABIES",
    '04022910':"WHOLE MILK",
    '04022920':"MILK FOR BABIES",
    '04022990':"OTHERS (E.G.MILK CREAM)",
    '040291':"OTHER MILK OR CREAM NOT CONTAINING SWEETENING MATTER",
    '04029110':"CONDENSED MILK",
    '040299':"OTHR MILK OR CREAM NOT CONTAINING SWEETENING MATTER",
    '04029910':"WHOLE MILK",
    '04029920':"CONDENSED MILK",
    '04029990':"OTHER MILK AND CREAM",
    '04039010': "BUTTERMILK",
    '040490':"PRODCTS OTHER THAN WHEY CONSISTING OF NATURAL MILK CONSTITUENTS",
    '04049000':"PRODCTS OTHER THAN WHEY CONSISTING OF NATURAL MILK CONSTITUENTS",
    '0405':"BUTTER; OTHER MILK-DERIVED FATS AND OILS; DAIRY SPREADS",
    '04059090':"OTHER MILK-DERIVED FATS AND OILS",
    '19':"PREPARATIONS OF CEREALS, FLOUR, STARCH OR MILK; PASTRYCOOKS PRODUCTS",
    '19011010':"MALTED MILK (INCLUDING POWDER)",
    '19011090':"OTHER FOOD PRPNS FR INFNT USE EXCL MALTED MILK",
    '22029010':"SOYA MILK DRINKS W/N SWEETNDOR FLAVRD",
    '22029030':"BEVERAGES CONTAINING MILK",
    '350220':"MILK ALBUMIN INCLDNG CONCENTRATES OF TWO OR MORE WHEY PROTEINS",
    '35022000':"MILK ALBUMIN INCLDNG CONCENTRATES OF TWO OR MORE WHEY PROTEINS",
    '8434':"MILKING MACHINES AND DAIRY MACHINERY",
    '843410':"MILKING MACHINES",
    '84341000':"MILKING MACHINES",
    '843490':"PARTS OF MILKNG AND DAIRY MACHINES",
    '84349010':"PARTS OF MILKING MACHINERY",
    '84388020':"MCHINERY FOR PRODUCTION OF SOYAMILK OR OTHER SOYA PRODUCTS(EXCEPT SOYA OIL)",
    }
    console.log(this);
    return(converter[this]);

  },
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
        var selectedMonth = Session.get('donutmonth');
        var selectedProduct = Session.get('donutproduct');
        console.log("exports ready");
        return ExportsFull.find({$and: [{year: selectedMonth},
                                              {product:selectedProduct}]
        }).fetch()[0].data
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

    },
});
