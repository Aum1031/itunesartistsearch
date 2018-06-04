import React, { Component } from 'react';
import Modal from './modal';
export default class GridBox extends Component {
  render() {
    //renders a div with cover album 
    return(
      <div className="coverAlbum">
        <img 
          src={this.props.imgUrl} 
          id={this.props.imgUrl} 
          onClick={this.props.imgClick}
          alt={this.props.albumName}
        />
        <Modal itunesUrl={this.props.itunesUrl} imgUrl={this.props.imgUrl} spanClose={this.props.spanClose}/>
      </div>
    )
  }
}
