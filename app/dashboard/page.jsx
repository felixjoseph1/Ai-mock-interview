import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl text-gray-950 font-bold">Dashboard</h2>
      <h2 className="rext-xl text-gray-500 font-semibold ">
        Create and start your AI Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
      <div>
        <InterviewList />
      </div>
    </div>
  );
};

export default Dashboard;
