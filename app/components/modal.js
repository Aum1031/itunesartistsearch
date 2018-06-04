import React, { Component } from 'react';

//creates modal after album cover clicked
export default class Modal extends Component {
  render() {
    return(
      <div onClick={this.props.spanClose} id={this.props.imgUrl+"Modal"} className="modal" ref={this.props.imgUrl+"Modal"}>
        <span className="close" onClick={this.props.spanClose} >&times;</span>
        <a href={this.props.itunesUrl} target="_blank"><img className="modal-content" id={this.props.imgUrl+"Img"} ref={this.props.itunesUrl}/></a>
        <a href={this.props.itunesUrl} target="_blank"><h5 id={this.props.imgUrl+"Caption"} className="caption" ref={this.props.itunesUrl}></h5></a>
      </div>
    )
  }
}