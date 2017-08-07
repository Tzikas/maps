import React, { Component } from 'react';
import ReactDom from 'react-dom';
import ReactModal from 'react-modal';
import RandomCityMap from '../Map/Randomcity';
import 'whatwg-fetch';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width                 : '600px',
    height                : '600px',
    transform             : 'translate(-50%, -50%)',
    textAlign             : 'center'
  }
};

export default class ExampleApp extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      name: null
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.log = this.log.bind(this);
  }

  handleOpenModal () {
    let name = prompt("Please enter your name", "Harry Potter");
    console.log(name);
    this.setState({ 
      showModal: true,
      name: name
    });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
    fetch('/api/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name
      })
    });
  }
  
   log(a){
   	console.log('sdf',a)
   }

  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Start Game</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles} 
	   >
            <h1>Which city is closer?</h1>
       	<RandomCityMap
	   sup={this.log('yo')}
		       
			/>
            <RandomCityMap />
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

// const props = {};

// ReactDOM.render(<ExampleApp {...props} />, document.getElementById('main'))
