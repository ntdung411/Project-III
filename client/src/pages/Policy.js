import React from "react";
import Layout from "./../components/Layout/Layout";

// Policy
const Policy = () => {
  return (
    <Layout title={"Privacy Policy - Ecommerce app"}>
      <div className="row policy">
        <div className="col-md-6">
          <img
            src="/images/policy.jpg"
            alt="privacy policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>
          <p className="text-justify mt-2">
          Chúng tôi cam kết bảo vệ quyền riêng tư và bảo mật thông tin cá nhân của bạn. 
          Dữ liệu của bạn sẽ chỉ được sử dụng theo cách bạn mong đợi, nhằm nâng cao trải nghiệm 
          khi sử dụng nền tảng của chúng tôi. Chính sách bảo mật này cung cấp chi tiết về cách 
          chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;