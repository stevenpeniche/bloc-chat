import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
	constructor(props) {
		super(props);
		this.messagesRef = this.props.firebase.database().ref('messages');
		this.state = {
			messages: [],
			newMessage: {
				username: this.props.user.displayName,
				content: '',
				sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
				roomId: this.props.activeRoom.key
			}
		};
	}

	componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({ messages: this.state.messages.concat( message ) })

		});
	}

	handleChange(e) {
		let newMessage = {...this.state.newMessage}
		newMessage.content = e.target.value
		newMessage.roomId = this.props.activeRoom.key
		this.setState({ newMessage })
	}

	sendMessage = (e) => {
		e.preventDefault();
		this.messagesRef.push(this.state.newMessage);
		this.refs.messageField.value = '';
	}

	filterSentAtTime = (time) => {
		let sentAt = new Date(time);
		let hour = sentAt.getHours();
		let minutes = sentAt.getMinutes()
		if (minutes < 10) {
			return hour < 12 ? hour + ':' + minutes + ' AM' : hour + ':0' + minutes + ' PM'
		}
		return hour < 12 ? hour + ':' + minutes + ' AM' : hour + ':' + minutes + ' PM'
	}

	matchMessagesToRoom = (message) => {
		if (message.roomId === this.props.activeRoom.key) {
			return	<li className="box" key={ message.key }>
								<article className="media">
									<div className="media-content">
										<div className="content">
											<p>
												<strong>{ message.username }</strong> <small>{ this.filterSentAtTime(message.sentAt) }</small>
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
			<div className="container is-fluid">
				<div className="message-list box">
					<ul>
						{ this.state.messages.map((message) =>
							this.matchMessagesToRoom(message)
						)}
					</ul>
				</div>
				<div className="form field has-addons">
					<div className="new-message-input control">
						<input className="input"
							type="text"
							ref='messageField'
							placeholder="Enter message.."
							onChange={ (e) => this.handleChange(e) }
						/>
					</div>
					<div className="control">
						<button className="button is-info" onClick={ (e) => this.sendMessage(e) }>Send</button>
					</div>
				</div>
			</div>
		)
	}
}

export default MessageList;
