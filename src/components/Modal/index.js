import React, { Component } from 'react';

class Modal extends Component {
	render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
    };

    return (
      <div style={ backdropStyle }>
        <div style={ modalStyle }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Modal;
