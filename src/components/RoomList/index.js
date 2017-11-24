import React, { Component } from 'react';
import Modal from '../Modal/index.js'

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.roomsRef = this.props.firebase.database().ref('rooms');
		this.state = {
			rooms: [],
			newRoomName: ''
		};
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) })
		});
	}

	toggleModal = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	handleChange(e) {
		this.setState({ newRoomName: e.target.value })
	}

	createRoom = (e) => {
		e.preventDefault();
		this.roomsRef.push({
		  name: this.state.newRoomName
		});
		this.setState({ newRoomName: '' })
		this.toggleModal()
	}

	render() {
		return (
			<div>
				<ul>
					{ this.state.rooms.map((room) =>
						<li key={ room.key }><a onClick={ () => this.props.setActiveRoom(room) }>{ room.name }</a></li>
					)}
				</ul>
				<button className="button is-dark" onClick={ this.toggleModal }>
					New Room
				</button>
				<Modal show={ this.state.isOpen } onClose={ this.toggleModal }>
					<form className="field">
						<label className="label">Your new room needs a name..</label>
						  <div className="control">
						    <input className="input"
									type="text"
									placeholder="What will it be?"
									onChange={ (e) => this.handleChange(e) }
								/>
						  </div>
							<div className="control">
								<button className="button is-primary" onClick={ (e) => this.createRoom(e) }>Create</button>
							</div>
					</form>
				</Modal>
			</div>
		)
	}
}

export default RoomList;
