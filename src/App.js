import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList/index.js'
import User from './components/User/index.js'
import Modal from './components/Modal/index.js'
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
			activeRoom: null,
			currentUser: null
		};
	}

	setActiveRoom = (room) => {
		this.setState({ activeRoom: room })
	}

	setUser = (user) => {
		this.setState({ currentUser: user })
	}

	toggleModal = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
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
						<User firebase={ firebase } setUser={ this.setUser } user={ this.state.currentUser }/>
						<RoomList firebase={ firebase } setActiveRoom={ this.setActiveRoom } toggleModal={ this.toggleModal }/>
					</div>
				</div>
				<div className='column is-four-fifths has-text-centered'>
					{ chatRoom }
				</div>
				<Modal className="is-overlay" show={ this.state.isOpen }>
					<form>
						<div className="field">
							<label className="label">Your new room needs a name..</label>
						</div>
						<div className="field">
							<input className="control input"
								type="text"
								placeholder="What will it be?"
								onChange={ (e) => this.handleChange(e) }
							/>
						</div>
						<div className="field is-grouped">
							<button className="control button is-info" onClick={ (e) => this.createRoom(e) }>
								Create
							</button>
							<button className="control button is-light" onClick={ this.toggleModal }>
								Cancel
							</button>
						</div>
					</form>
				</Modal>
      </div>
    );
  }
}

export default App;
