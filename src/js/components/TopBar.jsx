import React, { Component } from 'react'

class TopBar extends Component {
  render() {
    return (
      <div className="top-bar">
        <a href={ "https://www.twitch.tv/" + this.props.children.name } className="top-bar__link">
          { this.props.children.displayName }
        </a>
        <div className={ "top-bar__button " + (this.props.children.online ? "top-bar__button--online" : "top-bar__button--offline") }></div>
      </div>
    )
  }
}

export default TopBar
