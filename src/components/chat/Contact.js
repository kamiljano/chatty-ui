import React, {Component} from 'react';
import './SidePanel.css'
import {selectUser} from "../../actions";
import connect from "react-redux/es/connect/connect";

class Contact extends Component {

  constructor(props) {
    super(props);
    this.username = props.username;
    this.photo = props.photo;
    this.lastMessage = props.lastMessage;

    this.handleClick = this.handleClick.bind(this);
  }

  getClassName() {
    return this.props.selected && this.username === this.props.selected.username ? 'contact active' : 'contact';
  }

  handleClick() {
    this.props.selectUser({
      username: this.username,
      photo: this.photo
    });
  }

  render() {
    return (
      <li className={this.getClassName()} onClick={this.handleClick}>
        <div className="wrap">
          <span className="contact-status online"></span>
          <img src={this.photo}/>
          <div className="meta">
            <p className="name">{this.username}</p>
            <p className="preview">{this.lastMessage}</p>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.selectedUser
});

const mapDispatchToProps = dispatch => {
  return {
    selectUser: user => dispatch(selectUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);