import React, {Component} from 'react';
import './SidePanel.css'
import {loadUsers, selectUser} from "../../actions";
import connect from "react-redux/es/connect/connect";
import Contact from './Contact';
import { NavLink } from 'react-router-dom';

class SidePanel extends Component {

  componentDidMount() {
    this.props.loadUsers();
  }

  componentDidUpdate() {
    if (this.props.urlUser && !this.props.selectedUser && this.props.users) {
      const userToSelect = this.props.users.find(user => user.username === this.props.urlUser);
      if (userToSelect) {
        this.props.selectUser(userToSelect);
      }
    }
  }

  getContacts() {
    if (this.props.loading) {
      return <div className="no-contacts">Loading...</div>;
    }

    if (!this.props.users.length) {
      return <div className="no-contacts">No contacts</div>;
    }

    return this.props.users.map((user, id) =>
      <NavLink to={`/${user.username}`}>
        <Contact id={id}/>
      </NavLink>
    );
  }

  render() {
    return (
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <img id="profile-img" src={this.props.currentUser.photo} className="online" alt=""/>
            <p>{this.props.currentUser.username}</p>
          </div>
        </div>
        <div id="contacts">
          <ul>
            {this.getContacts()}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedUser: state.selectedUser,
  loading: state.users.loading,
  users: state.users.entries,
  currentUser: state.currentUser,
  urlUser: ownProps && ownProps.match && ownProps.match.params ? ownProps.match.params.user : null
});

const mapDispatchToProps = dispatch => {
  return {
    loadUsers: () => dispatch(loadUsers()),
    selectUser: user => dispatch(selectUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);