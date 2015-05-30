import Reflux from 'reflux';

var itemActions = Reflux.createActions([
  'loadItems',
  'loadItemsSuccess',
  'loadItemsError'
]);

itemActions.loadItems.preEmit = function(data) {
  // make your api call/ async stuff here
  setTimeout(function(){
    var items = [ 'Test1', 'Test2', 'Test3', 'Test4' ];
    itemActions.loadItemsSuccess(items);
  }, 500);
};

module.exports = itemActions;
