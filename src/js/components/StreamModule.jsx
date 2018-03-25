import React, { Component } from 'react'
import TopBar from './TopBar.jsx'

class StreamModule extends Component {
  // constructor(props) {
  //   super(props)
  // }

  getThumbnailUrl(width, height) {
    let thumbnailUrl = this.props.children.stream ? this.props.children.stream.thumbnail_url : "http://www.placehold.it/200x130"

    return this.replaceString(
      this.replaceString(thumbnailUrl, '{height}', height)
      , '{width}', width)
  }

  replaceString(str, before, after) {
    var regexp = new RegExp(before, 'gi')

    if (/[A-Z]/.test(before[0])) {
      var newAfter = after.charAt(0).toUpperCase() + after.slice(1)
    } else {
      var newAfter = after
    }

    return str.replace(regexp, newAfter)
  }

  render() {
    return (
      <div className="stream-module">
        <TopBar>
          { {
            displayName: this.props.children.user.display_name,
            online: this.props.children.stream ? true : false
          } }
        </TopBar>
        <a className="thumbnail" href={ "https://www.twitch.tv/" + this.props.children.user.display_name }>
          <img src={ this.getThumbnailUrl(200, 130) } alt="" />
        </a>
        <div className="bottom-bar">
          <div className="bottom-bar__left">
            <div className="stream-title">{ this.props.children.stream ? this.props.children.stream.title : "Offline" }</div>
          </div>
          <div className="bottom-bar__right">
            <div className="viewer-count">
            { this.props.children.stream ? this.props.children.stream.viewer_count : "0" }
            <i className="viewer-count__icon"></i></div>
          </div>
        </div>
      </div>
    )
  }
}

export default StreamModule
