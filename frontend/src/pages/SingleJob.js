import React, { useEffect } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBox from "../component/LoadingBox";
import { jobLoadSingleAction } from "../redux/actions/jobAction";
import { userApplyJobAction } from "../redux/actions/userAction";

const SingleJob = () => {
  const dispatch = useDispatch();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const { id } = useParams();

  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [id]);

  const applyForAJob = () => {
    dispatch(
      userApplyJobAction({
        title: singleJob && singleJob.title,
        description: singleJob && singleJob.description,
        salary: singleJob && singleJob.salary,
        location: singleJob && singleJob.location,
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto pt-30px">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1 bg-white p-4">
              {loading ? (
                <LoadingBox />
              ) : (
                <div className="bg-white rounded-lg p-4">
                  <h5 className="text-2xl font-semibold">
                    {singleJob && singleJob.title}
                  </h5>
                  <p className="text-gray-500 my-2">
                    <span className="font-semibold">Salary:</span> $
                    {singleJob && singleJob.salary}
                  </p>
                  <p className="text-gray-500 my-2">
                    <span className="font-semibold">Category:</span>{" "}
                    {singleJob && singleJob.jobType
                      ? singleJob.jobType.jobTypeName
                      : "No category"}
                  </p>
                  <p className="text-gray-500 my-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {singleJob && singleJob.location}
                  </p>
                  <p className="text-gray-600 mt-4">
                    {singleJob && singleJob.description}
                  </p>
                </div>
              )}
            </div>
            <div className="md:col-span-1 p-4 ">
              <div className="bg-white rounded-lg p-4 flex justify-between m-3 ">
                <button
                  onClick={applyForAJob}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Applied for this Job
                </button>
                <button
                  onClick={() => {
                    alert("chat will be added");
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  contact to admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleJob;
