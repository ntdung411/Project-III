import React from "react";
import Layout from "../../components/Layout/Layout";
import SellerMenu from "../../components/Layout/SellerMenu";
import { useAuth } from "../../context/auth";

const SellerDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Seller Dashboard"}>
      <div className="container-fluid m-4 p-4">
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9 d-flex justify-content-center">
            <div className="card shadow-lg p-4 rounded w-100">
              <h3 className="mb-3">Seller Name: {auth?.user?.name}</h3>
              <p className="text-muted mb-2">
                Seller Email: {auth?.user?.email}
              </p>
              <p className="text-muted mb-2">
                Seller Contact: {auth?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
