import React, {Component} from 'react';
import './SidePanel.css'
import {selectUser} from "../../actions";
import connect from "react-redux/es/connect/connect";

class Contact extends Component {

  constructor(props) {
    super(props);
    this.id = props.id;

    this.handleClick = this.handleClick.bind(this);
  }

  getClassName() {
    return this.props.selected && this.props.users[this.id].username === this.props.selected.username ? 'contact active' : 'contact';
  }

  handleClick() {
    this.props.selectUser({
      username: this.props.users[this.id].username,
      photo: this.props.users[this.id].photo
    });
  }

  render() {
    return (
      <li className={this.getClassName()} onClick={this.handleClick}>
        <div className="wrap">
          <span className="contact-status online"></span>
          <img src={this.props.users[this.id].photo}/>
          <div className="meta">
            <p className="name">{this.props.users[this.id].username}</p>
            <p className="preview">{this.props.users[this.id].lastMessage}</p>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.selectedUser,
  users: state.users.entries
});

const mapDispatchToProps = dispatch => {
  return {
    selectUser: user => dispatch(selectUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);