import React, {Component} from 'react';

export default class Info extends Component {
  //componenent that displays name of Artist that closely matches the inputted name in the search componenet
  render() {
    return (
      <div>
          <a href={this.props.state.artistViewUrl} target="_blank"><h3>{this.props.state.artistName}</h3></a>
      </div>
    )
  }
}