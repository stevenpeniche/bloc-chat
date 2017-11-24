import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props) {
		super(props);
		this.messagesRef = this.props.firebase.database().ref('messages');
		this.state = {
			messages: []
			// newMessage: {
			// 	username: ,
			// 	content: ,
			// 	sentAt: firebase.database.ServerValue.TIMESTAMP,
			// 	roomId:
			// }
		};
	}

	componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({ messages: this.state.messages.concat( message ) })
		});
	}

	// toggleModal = () => {
	// 	this.setState({
	// 		isOpen: !this.state.isOpen
	// 	});
	// }
  //
	// handleChange(e) {
	// 	this.setState({ newRoomName: e.target.value })
	// }
  //
	// createRoom = (e) => {
	// 	e.preventDefault();
	// 	this.messagesRef.push({
	// 	  name: this.state.newRoomName
	// 	});
	// 	this.setState({ newRoomName: '' })
	// 	this.toggleModal()
	// }

	matchMessagesToRoom = (message) => {
		if (message.roomId === this.props.activeRoom.key) {
			return	<li className="box" key={ message.key }>
								<article className="media">
									<div className="media-content">
										<div className="content">
											<p>
												<strong>{ message.username }</strong> <small>{ message.sentAt }</small>
												<br/>
												{ message.content }
											</p>
										</div>
									</div>
								</article>
							</li>
		}
	}

	render() {
		return (
			<div>
				<ul className="box">
					{ this.state.messages.map((message) =>
						this.matchMessagesToRoom(message)
					)}
				</ul>
			</div>
		)
	}
}

export default MessageList;
