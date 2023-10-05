// actions/chatActions.js
import * as chatConstants from "../constants/chatConstant";
import axios from "axios";

export const getMessages = (userId) => async (dispatch) => {
  try {
    dispatch({ type: chatConstants.CHAT_GET_MESSAGES_REQUEST });

    const messages = await axios.get(`/api/messages/${userId}`);

    dispatch({
      type: chatConstants.CHAT_GET_MESSAGES_SUCCESS,
      payload: messages,
    });
  } catch (error) {
    dispatch({
      type: chatConstants.CHAT_GET_MESSAGES_FAILURE,
      payload: error,
    });
  }
};

export const sendMessage = (adminId, userId, message) => async (dispatch) => {
  try {
    dispatch({ type: chatConstants.CHAT_SEND_MESSAGE_REQUEST });

    const newMessage = await axios.post(`/api/send`, adminId, userId, message);

    dispatch({
      type: chatConstants.CHAT_SEND_MESSAGE_SUCCESS,
      payload: newMessage,
    });
  } catch (error) {
    dispatch({
      type: chatConstants.CHAT_SEND_MESSAGE_FAILURE,
      payload: error,
    });
  }
};
