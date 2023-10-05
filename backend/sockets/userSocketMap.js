const userSocketMap = new Map();

function setUserSocket(userId, socketId) {
  userSocketMap.set(userId, socketId);
}

function removeUserSocket(userId) {
  if (userSocketMap.has(userId)) {
    userSocketMap.delete(userId);
  } else {
    console.error(`User socket not found for user ID: ${userId}`);
  }
}

function getUserSocket(userId) {
  const socketId = userSocketMap.get(userId);
  if (!socketId) {
    console.error(`User socket not found for user ID: ${userId}`);
  }
  return socketId;
}

module.exports = { setUserSocket, removeUserSocket, getUserSocket };
