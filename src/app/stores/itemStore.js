import Reflux from 'reflux';
import itemActions from '../actions/itemActions';

var itemStore = Reflux.createStore({

  init: function() {
    this.items = [];

    this.listenTo(itemActions.loadItems, this.loadItems);
    this.listenTo(itemActions.loadItemsError, this.loadItemsError);
    this.listenTo(itemActions.loadItemsSuccess, this.loadItemsSuccess);
  },

  loadItems: function() {
    this.trigger({ 
      loading: true
    });
  },

  loadItemsSuccess: function(items) {
    this.items = items;

    this.trigger({ 
      items : this.items,
      loading: false
    });
  },

  loadItemsError: function(error) {
    this.trigger({ 
      error : error,
      loading: false
    });
  }

});

module.exports = itemStore;
