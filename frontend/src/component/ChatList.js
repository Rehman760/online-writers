// ChatList.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMessages } from "../redux/actions/chatAction";

const ChatList = ({ chats, getMessages }) => {
  useEffect(() => {
    // Fetch chat list when the component mounts
    getMessages(); // You may need to pass the user ID for this function
  }, [getMessages]);

  return (
    <div>
      <h2>Chat List</h2>
      <ul>
        {/* {chats.map((chat) => (
          <li key={chat.id}>
            <Link to={`/chats/${chat.id}`}>{chat.username}</Link>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chats: state.chatGetMessages.messages, // Assuming you have a messages array with chat details
});

// export default connect(mapStateToProps, { getMessages })(ChatList);

export default ChatList;
