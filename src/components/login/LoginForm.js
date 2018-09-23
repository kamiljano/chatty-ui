import React, {Component} from 'react';
import {connect} from "react-redux";
import {logIn} from "../../actions/index";

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {username: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.logIn(this.state.username);
    return false;
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  render() {
    const {error} = this.props;

    return <div>
      Enter username:
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.username} onChange={this.handleChange}></input>
        <input type="submit" value="Log in"/>
      </form>
      {error && <div>Error! {error.message}</div>}
    </div>;
  }
}

const mapStateToProps = state => ({
  error: state.error
});

const mapDispatchToProps = dispatch => {
  return {
    logIn: username => dispatch(logIn(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);