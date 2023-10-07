import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../../redux/actions/jobAction";
import { Link } from "react-router-dom";

const DashJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(jobLoadAction());
  }, []);

  const { jobs, loading } = useSelector((state) => state.loadJobs);
  let data = [];
  data = jobs || [];

  // Function to delete a job by ID
  const deleteJobById = (e, id) => {
    console.log(id);
  };

  return (
    <div>
      <div className="pb-3">
        <h4 className="text-white text-2xl">Jobs list</h4>
      </div>
      <div className="pb-2 flex justify-end">
        <Link
          to="/admin/job/create"
          className="text-white bg-green-500 hover:bg-green-700 px-3 py-2 rounded text-sm"
        >
          Create Job
        </Link>
      </div>
      <div className="bg-secondary-midNightBlue">
        <div className="h-96 w-full">
          <table className="w-full text-white bg-blue-600">
            <thead>
              <tr>
                <th className="px-4 py-2">Job ID</th>
                <th className="px-4 py-2">Job name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Available</th>
                <th className="px-4 py-2">Salary</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id} className="bg-secondary-main">
                  <td className="px-4 py-2">{row._id}</td>
                  <td className="px-4 py-2">{row.title}</td>
                  <td className="px-4 py-2">{row.jobType.jobTypeName}</td>
                  <td className="px-4 py-2">{row.user.firstName}</td>
                  <td className="px-4 py-2">{row.available ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">${row.salary}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/edit/job/${row._id}`}
                      className="text-white bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded text-sm mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => deleteJobById(e, row._id)}
                      className="text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded text-sm"
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

export default DashJobs;
