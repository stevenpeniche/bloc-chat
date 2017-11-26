import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList/index.js'
import MessageList from './components/MessageList/index.js'
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
			isOpen: false,
			activeRoom: null
		};
	}

	setActiveRoom = (room) => {
		this.setState({ activeRoom: room })
	}

	render() {
		let chatRoom = null;
		if (this.state.activeRoom) {
			chatRoom =  <div className="section">
										<h1 className="title">{ this.state.activeRoom.name }</h1>
										<MessageList
											firebase={ firebase }
											activeRoom={ this.state.activeRoom }
										/>
									</div>
		} else {
				chatRoom = <div></div>
		}

    return (
      <div className="App columns">
				<div className="column has-text-centered">
					<div className="section">
						<h1 className="title is-size-1">Bloc Chat</h1>
						<RoomList firebase={ firebase } setActiveRoom={ this.setActiveRoom }/>
					</div>
				</div>
				<div className='column is-four-fifths has-text-centered'>
					{ chatRoom }
				</div>
      </div>
    );
  }
}

export default App;
