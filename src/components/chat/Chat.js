import React, {Component} from 'react';
import SidePanel from './SidePanel';
import Conversation from './Conversation';
import connect from "react-redux/es/connect/connect";
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Chat extends Component {
  render() {
    return (
      <div id="frame">
        <Router>
          <Route path="/:user?" component={SidePanel}/>
        </Router>
        {this.props.selectedUser
          && <Conversation/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedUser: state.selectedUser
});

export default connect(mapStateToProps)(Chat);
