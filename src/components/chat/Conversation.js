import React, {Component} from 'react';
import { connect } from "react-redux";
import {loadUsers} from "../../actions";

class Conversation  extends Component {

  getSelectedUserInfo() {
    if (this.props.selectedUser) {
      return  <div className="contact-profile">
        <img src={this.props.selectedUser.photo} alt=""/>
        <p>{this.props.selectedUser.username}</p>
      </div>;
    }
    return  <div className="contact-profile"></div>;
  }

  render() {
    return <div className="content">
      {this.getSelectedUserInfo()}
      <div className="messages">
        <ul>
          <li className="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
            <p>When you're backed against the wall, break the god damn thing down.</p>
          </li>
          <li className="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
            <p>Excuses don't win championships.</p>
          </li>
          <li className="sent">
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt=""/>
            <p>Oh yeah, did Michael Jordan tell you that?</p>
          </li>
          <li className="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
            <p>No, I told him that.</p>
          </li>
          <li className="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
            <p>What are your choices when someone puts a gun to your head?</p>
          </li>
          <li className="sent">
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt=""/>
            <p>What are you talking about? You do what they say or they shoot you.</p>
          </li>
          <li className="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
            <p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one
              of a
              hundred and forty six other things.</p>
          </li>
        </ul>
      </div>
      <div className="message-input">
        <div className="wrap">
          <input type="text" placeholder="Write your message..."/>
          <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
          <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>;
  }

}

const mapStateToProps = state => ({
  selectedUser: state.selectedUser,
  messages: state.messages
});

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);