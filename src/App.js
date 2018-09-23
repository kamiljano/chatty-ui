import React, {Component} from 'react';
import './App.css';
import Chat from './components/chat/Chat';
import LoginForm from './components/login/LoginForm';
import {connect} from "react-redux";
import {loadSession} from "./actions/index";

class App extends Component {

  componentDidMount() {
    this.props.loadSession();
  }

  render() {
    const {loggedIn, loading} = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!loggedIn) {
      return <LoginForm/>
    }

    return (
      <Chat/>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: Boolean(state.username),
  error: state.error,
  loading: state.loading
});

const mapDispatchToProps = dispatch => {
  return {
    loadSession: () => dispatch(loadSession())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);