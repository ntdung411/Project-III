import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiBeenHere, BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'

// Contact 
const Contact = () => {
  return (
    <Layout title={'Contact us'}>
        <div className='row contactus '>
          <div className='col-md-6 '>
            <img 
            src='/images/contactus.jpeg'
            alt='contactus'
            style={{ width: "100%" }}
            />
          </div>
          <div className='col-md-4'>
            <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
            <p className='text-justify mt-2'>
            Mọi thắc mắc và thông tin về sản phẩm, xin vui lòng liên hệ với chúng tôi. 
            Chúng tôi luôn sẵn sàng phục vụ bạn bất cứ lúc nào.
            </p>
            <p className="mt-3">
              <BiBeenHere /> : Số 1 Đ. Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội
            </p>
            <p className='mt-3'>
              <BiMailSend /> : halong4399@gmail.com
            </p>
            <p className='mt-3'>
              <BiPhoneCall /> : 0906195855
            </p>
            <p className='mt-3'>
              <BiSupport /> : 0906195855 (Mr. Lucas Nguyen)
            </p>

          </div>
        </div>
    </Layout>
  )
}

export default Contact