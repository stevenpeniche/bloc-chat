import React, { Component } from 'react';
import './RoomList.css';

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
						<li key={ room.key }><a className="is-size-4" onClick={ () => this.props.setActiveRoom(room) }>{ room.name }</a></li>
					)}
				</ul>
				<button id="new-room"className="button is-dark" onClick={ this.props.toggleModal }>
					New Room
				</button>
			</div>
		)
	}
}

export default RoomList;
