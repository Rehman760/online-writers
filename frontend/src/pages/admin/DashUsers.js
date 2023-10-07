import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUserAction } from "../../redux/actions/userAction";
import { Link } from "react-router-dom";
import moment from "moment";
const DashUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUserAction());
  }, []);

  const { users, loading } = useSelector((state) => state.allUsers);
  let data = [];
  data = users || [];

  const deleteUserById = (e, id) => {
    console.log(id);
  };

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "E_mail",
      width: 150,
    },
    {
      field: "role",
      headerName: "User status",
      width: 150,
      renderCell: (params) =>
        params.row.role === 1 ? "Admin" : "Regular user",
    },
    {
      field: "createdAt",
      headerName: "Creation date",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },
    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <div className="flex justify-between" style={{ width: "170px" }}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded">
            <Link
              to={`/admin/edit/user/${values.row._id}`}
              style={{ textDecoration: "none" }}
            >
              Edit
            </Link>
          </button>
          <button
            onClick={(e) => deleteUserById(e, values.row._id)}
            className="bg-red-500 hover:bg-red-700 text-white text-sm px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="pb-3">
        <h4 className="text-white text-2xl">All users</h4>
      </div>
      <div className="pb-2 flex justify-end">
        <button className="bg-green-500 hover:bg-green-700 text-white text-sm px-3 py-2 rounded">
          <Link to="/create/user" style={{ textDecoration: "none" }}>
            Create user
          </Link>
        </button>
      </div>
      <div className="bg-secondary-midNightBlue">
        <div className="h-96 w-full">
          <table className="w-full text-white bg-blue-600">
            <thead>
              <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">E_mail</th>
                <th className="px-4 py-2">User status</th>
                <th className="px-4 py-2">Creation date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id} className="bg-secondary-main">
                  <td className="px-4 py-2">{row._id}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">
                    {row.role === 1 ? "Admin" : "Regular user"}
                  </td>
                  <td className="px-4 py-2">
                    {moment(row.createdAt).format("YYYY-MM-DD HH:MM:SS")}
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded mr-2">
                      <Link
                        to={`/admin/edit/user/${row._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        Edit
                      </Link>
                    </button>
                    <button
                      onClick={(e) => deleteUserById(e, row._id)}
                      className="bg-red-500 hover.bg-red-700 text-white text-sm px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashUsers;
