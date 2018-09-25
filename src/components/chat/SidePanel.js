import React, {Component} from 'react';
import './SidePanel.css'
import {loadUsers} from "../../actions";
import connect from "react-redux/es/connect/connect";
import Contact from './Contact';

class SidePanel extends Component {

  componentDidMount() {
    this.props.loadUsers();
  }

  getContacts() {
    if (this.props.loading) {
      return <div className="no-contacts">Loading...</div>;
    }

    if (!this.props.users.length) {
      return <div className="no-contacts">No contacts</div>;
    }

    return this.props.users.map((user, id) => <Contact id={id}/>);
  }

  render() {
    return (
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <img id="profile-img" src={this.props.currentUser.photo} className="online" alt=""/>
            <p>{this.props.currentUser.username}</p>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active"><span className="status-circle"></span>
                  <p>Online</p></li>
                <li id="status-away"><span className="status-circle"></span>
                  <p>Away</p></li>
                <li id="status-busy"><span className="status-circle"></span>
                  <p>Busy</p></li>
                <li id="status-offline"><span className="status-circle"></span>
                  <p>Offline</p></li>
              </ul>
            </div>
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

const mapStateToProps = state => ({
  loading: state.users.loading,
  users: state.users.entries,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => {
  return {
    loadUsers: () => dispatch(loadUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);