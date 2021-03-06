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
    this.props.logIn(this.state.username);
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
      {error && error.response && error.response.data && <div>Error! {error.message} : {error.response.data.error}</div>}
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