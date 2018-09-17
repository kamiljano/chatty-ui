import React, {Component} from 'react';
import SidePanel from './SidePanel';
import Conversation from './Conversation';

class Chat extends Component {
  render() {
    return (
      <div id="frame">
        <SidePanel/>
        <Conversation/>
      </div>
    );
  }
}

export default Chat;
