import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './css/style.css';
import Search from './components/search';
import Info from './components/info';
import Grid from './components/grid';


/**********************************************************************************************************
 * BUILD FILES are bigger than recommended allowance... 
options for this would be to do the ff: minify or tree shaking or compression
***********************************************************************************************************/

// 1. Create a github Repo or Click 'Fork' from the top menu and generate your own JSFiddle link. 
// Be sure to click 'Update' when your work is done.
class Hello extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      artistName: '',
      artistId: '',
      artistViewUrl: '',
      genre: '',
      albumResults: '',
    };
  }

  //validates that sufficient characters for a query were inputted to notify user
  getValidationState() {
    const length = this.state.query.length;
    if (length > 3) return 'success';
    else if (length > 2) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  //makes get requests for every inputChange to API to collect info of artist who appeared at the top of the search query
  handleInputChange(e) {
    this.setState({
      query: e.target.value
    })
    if (this.state.query && this.state.query.length > 1) {
      axios.get(`https://itunes.apple.com/search?term=${this.state.query}&entity=album`)
      .then(({ data }) => {
        if (data.results.length) {
          this.setState({
            artistName: data.results[0].artistName,
            artistId: data.results[0].artistId,
            artistViewUrl: data.results[0].artistViewUrl
          })
        }
      })
    } 
  }

  handleEnter(e) {
    if (e.which==13) {
      this.getAlbum(e);
    }
  }

  // 3. On Search, make an api call to iTunes API to fetch the information about the artist
  // API URL: https://itunes.apple.com/search?term=${ARTIST_NAME}.
  // Added "&entity=album" at end of URL to narrow down results to albums
  getAlbum(e) {
    e.preventDefault();
    if (this.state.query && this.state.query.length > 1) {
      axios.get(`https://itunes.apple.com/lookup?id=${this.state.artistId}&entity=album`)
      .then(({ data }) => {
        let albums = {};
        for (let i = 1; i < data.results.length; i++) {
          if (!albums[data.results[i].artworkUrl100] && data.results[i].collectionName.indexOf('- Single') === -1) {
            albums[data.results[i].artworkUrl100] = {};
            albums[data.results[i].artworkUrl100].pic = data.results[i].artworkUrl100  
            albums[data.results[i].artworkUrl100].albumName = data.results[i].collectionName;
            albums[data.results[i].artworkUrl100].albumLink = data.results[i].collectionViewUrl;
          }
        }
        this.setState({albumResults: albums});
      })
    } 
  }

  imgClick(e) {
    // Get the modal
    let modal = document.getElementById(e.target.id + "Modal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let modalImg = document.getElementById(e.target.id + "Img");
    let captionText = document.getElementById(e.target.id + "Caption");
    modal.style.display = "inline-block";
    modalImg.src = e.target.src;
    captionText.innerHTML = e.target.alt;
  }
  
  //close span of modal
  spanClose(e) {
    // identifies if source of event (e.target) is the same
    // with currentTarget prevents event bubbling from clicking a tag
    if (e.currentTarget === e.target){
      let modal = e.target.parentNode;
      modal.style.display = "none";
    }
  }

  render() {
  	const { name } = this.props;
    return (
      <div id="container">
        <img id="logo" src="http://3.bp.blogspot.com/-vHcJmghlzu0/UjqQzhShlpI/AAAAAAAAAg8/KhPa1fW-dBE/s1600/itunes-logo.png" />
        <Search 
          getValidationState={this.getValidationState.bind(this)}
          state={this.state}
          handleInputChange={this.handleInputChange.bind(this)}
          getAlbum={this.getAlbum.bind(this)}
          handleEnter={this.handleEnter.bind(this)}
        />
        <br></br>
        <Info state={this.state}/>
        <Grid 
          state={this.state} 
          imgClick={this.imgClick.bind(this)}
          spanClose={this.spanClose.bind(this)}
        />
      </div>
    );
  }
}

render(
  <Hello/>, 
  document.getElementById('albums-container')
);
