import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
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
    template: 'consumption'
});
Router.route('/policy', {
    template: 'consumption'
});
// import './main.html';
