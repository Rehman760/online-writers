import React from "react";
import StatComponent from "../../component/StatComponent";
import { Chart } from "react-google-charts";
import { data, options } from "./data/data";
import ChartComponent from "../../component/ChartComponent";

const AdminDashboard = () => {
  return (
    <div className="p-4 bg-primary">
      <h1 className="text-2xl text-white pb-3">Dashboard</h1>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
        <StatComponent
          value="45621"
          icon={<i className="fas fa-user" />}
          description="Administrators"
          money=""
        />

        <StatComponent
          value="450"
          icon={<i className="fas fa-briefcase" />}
          description="Jobs"
          money=""
        />

        <StatComponent
          value="6548"
          icon={<i className="fas fa-folder" />}
          description="Jobs categories"
          money=""
        />
      </div>

      <div className="mt-3 flex flex-col md:flex-row">
        <ChartComponent>
          <Chart
            chartType="Bar"
            data={data}
            options={options}
            width="100%"
            height="300px"
            legendToggle
          />
        </ChartComponent>
      </div>
    </div>
  );
};

export default AdminDashboard;
