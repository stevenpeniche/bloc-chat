import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList/index.js'
import * as firebase from 'firebase';
// Initialize Firebase
var config = {
	apiKey: "AIzaSyAZjbuLT38fFx5IAG0lnyAXho3wDtd6464",
	authDomain: "bloc-chat-bfd.firebaseapp.com",
	databaseURL: "https://bloc-chat-bfd.firebaseio.com",
	projectId: "bloc-chat-bfd",
	storageBucket: "bloc-chat-bfd.appspot.com",
	messagingSenderId: "319881122992"
};
firebase.initializeApp(config);


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	render() {
    return (
      <div className="App">
				<h1 className="title">Bloc Chat</h1>
				<RoomList className="" firebase={ firebase }/>
      </div>
    );
  }
}

export default App;
