import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const DashCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Replace with your logic for jobTypeLoadAction
  }, []);

  const { jobType, loading } = useSelector((state) => state.jobTypeAll);
  const data = jobType || [];

  // Replace with your delete job category logic
  const deleteJobCategoryById = (e, id) => {
    console.log(id);
  };

  return (
    <div>
      <h1 className="text-2xl text-white pb-3">Jobs category</h1>
      <div className="pb-2 flex justify-end">
        <button className="bg-green-500 text-white px-2 py-1 rounded">
          <Link to="/admin/category/create">Create category</Link>
        </button>
      </div>
      <div className="bg-secondary-midNightBlue">
        <div style={{ height: 400, width: "100%" }}>
          <table className="w-full bg-blue-600">
            <thead>
              <tr className="bg-primary text-white">
                <th className="w-1/6 px-4 py-2">Category ID</th>
                <th className="w-1/3 px-4 py-2">Category</th>
                <th className="w-1/3 px-4 py-2">Create At</th>
                <th className="w-1/6 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id} className="bg-secondary-main text-white">
                  <td className="px-4 py-2">{row._id}</td>
                  <td className="px-4 py-2">{row.jobTypeName}</td>
                  <td className="px-4 py-2">
                    {moment(row.createdAt).format("YYYY-MM-DD HH:MM:SS")}
                  </td>
                  <td className="px-4 py-2">
                    <div
                      className="flex justify-between"
                      style={{ width: "170px" }}
                    >
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        <Link to={`/admin/edit/user/${row._id}`}>Edit</Link>
                      </button>
                      <button
                        onClick={(e) => deleteJobCategoryById(e, row._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
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

export default DashCategory;
