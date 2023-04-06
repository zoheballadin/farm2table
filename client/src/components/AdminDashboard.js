import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <div> Admin Home</div>
      <Link to={"/admin/searchsellers"}>Search Sellers</Link><br/>
      <Link to={"/admin/requests"}>Requests</Link>
    </div>
  );
};

export default AdminDashboard;
