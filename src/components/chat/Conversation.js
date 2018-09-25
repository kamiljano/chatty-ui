import React, {Component} from 'react';
import { connect } from "react-redux";
import {submitMessage} from "../../actions";

class Conversation  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMessage: ''
    };

    this.messagesEnd = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getSelectedUserInfo() {
    if (this.props.selectedUser) {
      return  <div className="contact-profile">
        <img src={this.props.selectedUser.photo} alt=""/>
        <p>{this.props.selectedUser.username}</p>
      </div>;
    }
    return  <div className="contact-profile"></div>;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitMessage(this.props.selectedUser.username, this.state.currentMessage);
    this.setState({currentMessage: ''});
  }

  handleChange(event) {
    this.setState({currentMessage: event.target.value});
  }

  scrollToBottom() {
    this.messagesEnd.current.scrollIntoView();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  getMessages() {
    return this.props.messages.map(message => {
      return <li className={message.from === '~' ? 'sent' : 'replies'}>
        <img src={message.from === '~' ? this.props.currentUser.photo : this.props.selectedUser.photo} alt=""/>
        <p>{message.content}</p>
      </li>
    });
  }

  render() {
    return <div className="content">
      {this.getSelectedUserInfo()}
      <div className="messages">
        <ul>
          {this.getMessages()}
          <li ref={this.messagesEnd}></li>
        </ul>
      </div>
      <div className="message-input">
        <div className="wrap">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Write your message..." onChange={this.handleChange} value={this.state.currentMessage}/>
            <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
            <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
          </form>
        </div>
      </div>
    </div>;
  }

}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  selectedUser: state.selectedUser,
  messages: state.messages
});

const mapDispatchToProps = dispatch => {
  return {
    submitMessage: (targetUsername, message) => dispatch(submitMessage(targetUsername, message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);