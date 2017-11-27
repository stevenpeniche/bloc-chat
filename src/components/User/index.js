import React, { Component } from 'react';

class User extends Component {
	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
		  this.props.setUser(user);
		});
	}

	signIn = () => {
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup( provider );
	}

	signOut = () => {
		this.props.firebase.auth().signOut();
		window.location.reload()
	}

	changeSignButton() {
		if(this.props.user) {
			return 	<div>
								<h2 className="subtitle">{ this.props.user.displayName }</h2>
						 		<button className="button is-danger" onClick={ this.signOut }>Sign-out</button>
						 	</div>
		}
			return	<div>
								<button className="button is-info" onClick={ this.signIn }>Sign-in</button>
							</div>
	}

	render() {
    return (
      <div>
				{ this.changeSignButton() }
      </div>
    );
  }
}

export default User;
