import React from "react";
import { useSelector } from "react-redux";
import CardElement from "../../component/CardElement";

const UserJobsHistory = () => {
  const { user } = useSelector((state) => state.userProfile);

  return (
    <div className="py-4">
      <h2 className="text-2xl text-white">Jobs History</h2>
      <div>
        {user &&
          user.jobsHistory.map((history, i) => (
            <CardElement
              key={i}
              id={history._id}
              jobTitle={history.title}
              description={history.description}
              category=""
              location={history.location}
            />
          ))}
      </div>
    </div>
  );
};

export default UserJobsHistory;
