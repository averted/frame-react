import React from 'react';
import itemStore from '../stores/itemStore';
import itemActions from '../actions/itemActions';

var itemList = React.createClass({

  getInitialState: function() {
    return {
      items : [],
      loading : false,
      error : false
    }
  },

  componentDidMount: function() {
    this.unsubscribe = itemStore.listen(this.onStatusChange);
    itemActions.loadItems();
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  onStatusChange: function(state) {
    this.setState(state);
  },

  render: function() {
    var items = this.state.items.map((item, itemIndex) => <li key={ item }>{ item }</li>),
      loading = this.state.loading ? <div>Loading...</div> : '';

    return (
      <div>
        { loading }
        <ul>
          {items}
        </ul>
      </div>
    );
  }
                                     
});

module.exports = itemList;
