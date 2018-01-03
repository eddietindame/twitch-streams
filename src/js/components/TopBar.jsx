import React, { Component } from 'react';

class TopBar extends Component {
  render() {
    return (
      <div className="top-bar">
        <a href={ "https://www.twitch.tv/" + this.props.children } className="top-bar__link">
          { this.props.children }
        </a>
        <div className="top-bar__button"></div>
      </div>
    );
  }
}

export default TopBar;
