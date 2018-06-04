import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
// import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

//Search Component for entering an Artist using Bootstrap

// 4. When the Search button is clicked, 
//make a call to the API and display the list of albums, 
//including the album name and album cover inside #albums-container in a grid. 
//Use any CSS technique you are comfortable with 
//(Note: The API will return a list of albums based on the search result. 
//Use your skills to find out what the iTunes API data structure looks 
//like and extract the relevant data from it).
export default class Search extends Component {
  render() {
    return (
      <div id="formContainer">
          <FormGroup
            controlId="formBasicText"
            validationState={this.props.getValidationState()}
          >
            <FormControl 
              type="text"
              value={this.props.state.query}
              placeholder="Find Artist"
              onChange={this.props.handleInputChange}
              onKeyDown={this.props.handleEnter}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button 
            className="submitBtn"
            type="submit"
            onClick={this.props.getAlbum} 
            bsStyle="info">Submit
          </Button>
      </div>
    )
  }
}



