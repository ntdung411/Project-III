import React from "react";
import Layout from "./../components/Layout/Layout";

// About us
const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="about"
            style={{width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">
            ABOUT US
            </h1>
          <br></br>
          <p className="text-justify mt-2">
          Chào mừng bạn đến với nền tảng thương mại điện tử của chúng tôi! Tại đây, 
          chúng tôi cam kết mang đến trải nghiệm mua sắm trực tuyến tuyệt vời nhất, 
          giúp bạn dễ dàng tìm kiếm và lựa chọn sản phẩm phù hợp với nhu cầu. 
          Với một loạt các danh mục sản phẩm phong phú, từ thời trang, công nghệ, 
          đồ gia dụng đến thực phẩm và nhiều hơn thế nữa, chúng tôi không ngừng 
          cải tiến để đáp ứng mọi nhu cầu của bạn. Hãy khám phá và tận hưởng 
          những ưu đãi đặc biệt cùng dịch vụ chăm sóc khách hàng tận tâm từ chúng tôi!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;