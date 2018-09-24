import React, {Component} from 'react';
import SidePanel from './SidePanel';
import Conversation from './Conversation';
import connect from "react-redux/es/connect/connect";

class Chat extends Component {
  render() {
    return (
      <div id="frame">
        <SidePanel/>
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
