// reducers/chatReducers.js
import * as chatConstants from "../constants/chatConstant";

export const chatGetMessagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case chatConstants.CHAT_GET_MESSAGES_REQUEST:
      return { loading: true, messages: [] };
    case chatConstants.CHAT_GET_MESSAGES_SUCCESS:
      return { loading: false, messages: action.payload };
    case chatConstants.CHAT_GET_MESSAGES_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chatSendMessageReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case chatConstants.CHAT_SEND_MESSAGE_REQUEST:
      return { loading: true, message: {} };
    case chatConstants.CHAT_SEND_MESSAGE_SUCCESS:
      return { loading: false, message: action.payload };
    case chatConstants.CHAT_SEND_MESSAGE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
