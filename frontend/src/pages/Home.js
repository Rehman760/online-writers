import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../redux/actions/jobAction";
import { Link, useParams } from "react-router-dom";
import CardElement from "../component/CardElement";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import SelectComponent from "../component/SelectComponent";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const Home = () => {
  const { jobs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadJobs
  );
  const dispatch = useDispatch();
  const { keyword, location } = useParams();

  const [page, setPage] = useState(1);
  const [cat, setCat] = React.useState("");

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Header />
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex flex-col">
              <div className="col-span-1 bg-white p-4 md:mb-6">
                <div className="mb-4">
                  <h4 className="text-primary font-semibold">
                    Filter job by category
                  </h4>
                </div>
                <SelectComponent
                  handleChangeCategory={handleChangeCategory}
                  cat={cat}
                />
              </div>
              <div className="col-span-1 bg-white p-4 md:mb-6">
                <div className="mb-4">
                  <h4 className="text-primary font-semibold">
                    Filter job by location
                  </h4>
                </div>
                <ul>
                  {setUniqueLocation &&
                    setUniqueLocation.map((location, i) => (
                      <li key={i} className="flex items-center mb-1">
                        <LocationMarkerIcon className="w-5 h-5 text-primary mr-2" />
                        <Link
                          to={`/search/location/${location}`}
                          className="text-primary"
                        >
                          {location}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-span-4 md:col-span-3">
              {loading ? (
                <LoadingBox />
              ) : jobs && jobs.length === 0 ? (
                <div className="min-h-[350px] flex items-center justify-center">
                  <h2>No result found!</h2>
                </div>
              ) : (
                jobs &&
                jobs.map((job, i) => (
                  <CardElement
                    key={i}
                    id={job._id}
                    jobTitle={job.title}
                    description={job.description}
                    category={
                      job.jobType ? job.jobType.jobTypeName : "No category"
                    }
                    location={job.location}
                  />
                ))
              )}
              <div className="flex justify-center space-x-2 mt-4">
                <div>
                  <button
                    onClick={() => setPage((prevPage) => prevPage - 1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    disabled={page === pages || pages === 0}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
