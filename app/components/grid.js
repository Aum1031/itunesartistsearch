import React, { Component } from 'react';
import GridBox from './gridBox';

export default class Grid extends Component{
  render(){
    const covers = [];
      Object.keys(this.props.state.albumResults).forEach( (link, index) => {
        covers.push( <GridBox 
                        itunesUrl={this.props.state.albumResults[link].albumLink}
                        imgUrl={link}
                        key={link + index}
                        imgClick={this.props.imgClick}
                        albumName={this.props.state.albumResults[link].albumName}
                        spanClose={this.props.spanClose}
                        />
                    )
    })
    return(
        <div className="gridContainer">
            {covers}
        </div>
    )
  }
}