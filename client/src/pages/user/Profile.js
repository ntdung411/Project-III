import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    // context
    const [auth, setAuth] = useAuth()
    // state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("");

    // get user data
    useEffect(() => {
        const {email, name, phone, address} = auth?.user
        setName(name)
        setPhone(phone)
        setEmail(email)
        setAddress(address)
    },[auth?.user])

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
            name,
            email,
            password,
            phone,
            address,
        });
        if(data?.error){
            toast.error(data?.error)
        }
        else {
            setAuth({...auth, user: data?.updatedUser})
            let ls = localStorage.getItem("auth")
            ls = JSON.parse(ls)
            ls.user = data.updatedUser
            localStorage.setItem('auth', JSON.stringify(ls))
            toast.success("Profile Updated Successfully")
        }
        } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        }
    };

  return (
    <Layout title={"Dashboard - Profile"}>
        <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h1>
                        <div className="register">
                        <h1>User Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="exampleInputName"
                                placeholder="Enter your name"
                                
                            />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter your email"
                                
                                disabled
                            />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter your password"
                                
                            />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="exampleInputPhone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control"
                                id="exampleInputPhone"
                                placeholder="Enter your phone"
                                
                            />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="exampleInputAddress" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder="Enter your address"
                                
                            />
                            </div>
                            <button type="submit" className="btn btn-submit">
                            Update
                            </button>
                        </form>
                        </div>
                    </h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile