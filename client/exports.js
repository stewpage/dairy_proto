Template.trade.helpers({

  months: function(){

    var subs = Meteor.subscribe('exports');
    if (subs.ready()) {
      var months = Exports.find().fetch();
      var arrayLength = months.length;
      var monthlist = [];
      for (var i = 0; i < arrayLength; i++) {
        monthlist.push(months[i].month);
        }
      console.log(monthlist.sort());
      return monthlist;
    } else {
      return;
    }
  }
});


Template.trade.events({

    "change #month-select": function (event, template) {
        var month = $(event.currentTarget).val();
        console.log("month : " + month);
        Session.set('donutmonth', month);

        // additional code to do what you want with the category
    }
});
