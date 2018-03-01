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
		const sentAt = new Date(time);
		let hour = sentAt.getHours();
		let minutes = sentAt.getMinutes()
		const AMorPM = hour < 12 || 0 ? " AM" : " PM";

		hour = hour === 0 ? 12 : hour;
		minutes = minutes < 10 ? "0" + minutes : minutes;

		return hour <= 12 ? `${hour}:${minutes} ${AMorPM}`: `${hour - 12}:${minutes} ${AMorPM}`
	}

	render() {
		return (
			<div className="message-list-window-container">
				<div className="message-list-window box">
					<ul className="message-list">
						{ this.state.messages.map((message) => {
								const currentUserMessage = message.username === this.props.user.displayName ? true : false;

								return message.roomId === this.props.activeRoom.key ?
											<li className={`message ${currentUserMessage ? "is-link": ""} box`} key={ message.key } style={currentUserMessage ? {alignSelf: "flex-end"} : {}}>
												<article className="media">
													<div className="media-content">
														<div className="content">
															<div className="user-header">
																<strong>{ message.username }</strong><small>{ this.filterSentAtTime(message.sentAt) }</small>
																<br/>
															</div>
															{ message.content }
														</div>
													</div>
												</article>
											</li>
											:
											null
							}
						)}
					</ul>
				</div>
				<form className="form field has-addons">
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
				</form>
			</div>
		)
	}
}

export default MessageList;
