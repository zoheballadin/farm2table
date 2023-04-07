import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-4xl text-center"> Admin Home</h2>
      <Link className="" to="/admin/searchsellers"><button className="w-[50vw] bg-sky-300 text-white text-3xl mx-auto block py-[5vh] -mb-4 mt-12">Search Sellers</button></Link><br/>
      <Link className="" to="/admin/requests"><button className="w-[50vw] bg-sky-300 text-white mx-auto text-3xl block py-[5vh]">Requests</button></Link>
    </div>
  );
};

export default AdminDashboard;
