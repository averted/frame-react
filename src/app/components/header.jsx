import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({

  render: function() {
    return (
      <header className="clearfix">
        <span className="logo">React Frame</span>

        <nav className="clearfix">
          <div className="nav-item"><Link location="history" to="home">Home</Link></div>
          <div className="nav-item"><Link location="history" to="info">Info</Link></div>
          <div className="nav-item"><Link location="history" to="test">Test</Link></div>
        </nav>
      </header>
    );
  }

});

module.exports = Header;
