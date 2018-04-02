import React from "react";

import BookSearch from "./BookSearch/";
import Sidebar from "./Sidebar";

const Dashboard = () => (
  <main className="container">
    <Sidebar />
    <BookSearch />
  </main>
);

export default Dashboard;
