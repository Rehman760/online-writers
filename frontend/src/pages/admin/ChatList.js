import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from your API
    fetch("/api/allusers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching user data: ", error));
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleUserSelect = (userID) => {
    setSelectedUserID(userID);
    navigate(`/admin/user/chats`, {
      state: { receiver: selectedUserID },
    });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigateToChat = () => {
    if (selectedUserID) {
      navigate(`/admin/user/chats`, {
        state: { receiver: selectedUserID },
      });
    }
  };

  return (
    <div>
      <div className="pb-3">
        <h4 className="text-white text-2xl">Chat list</h4>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Search by First Name"
          className="w-full p-2 border rounded-l focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="overflow-y-auto max-h-96">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="p-4 border rounded mb-2 cursor-pointer"
            onClick={() => handleUserSelect(user._id)}
          >
            <img
              src={user.profileImage}
              alt={user.firstName}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <p className="text-center mt-2">{user.firstName}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ul className="flex justify-center">
          {Array.from(
            { length: Math.ceil(users.length / usersPerPage) },
            (_, index) => (
              <li key={index} className="px-2">
                <button
                  className={`${
                    index + 1 === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } p-2 rounded`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={navigateToChat}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default ChatList;
