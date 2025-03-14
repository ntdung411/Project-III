import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import Profile from './user/Profile'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const [clientToken, setClientToken] = useState("")
    const [instance, setinstance] = useState("")
    const [loading, setLoading] = useState("")
    const navigate = useNavigate()

    // total price
    const totalPrice = () => {
        try {
            let total = 0
            cart?.map(item => {total = total + item.price})
            return total.toLocaleString("en-US", {
                style:"currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }

    // delete Item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
   

    //get payment gateway token
    const getToken = async() => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken()
    }, [auth?.token])

    // handle payment
    const handlePayment = async() => {
        try {
            setLoading(true)
            const {nonce} = await instance.requestPaymentMethod()
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce, cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('Payment completed successfully')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length  
                        ? `You Have ${cart.length} items in your cart ${auth?.token ? "" 
                        : "Please login to checkout"}` : "Your Cart is empty"}
                    </h4>
                </div>
            </div>
            <div className='d-flex justify-content-around row mb-4'>
                <div className='col-md-6'>
                    {
                        cart?.map( p => (
                            <div className='row mb-2 card flex-row'>
                                <div className='col-md-4'>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={`auto`}
                                    />
                                </div>
                                <div className='col-md-8 d-flex flex-column justify-content-center w-auto'>
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0,30)}</p>
                                    <p>Price : {p.price}</p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='col-md-4 text-center'>
                   <h4>Cart Summary</h4>
                   <p>Total | CheckOut | Payment</p>
                   <hr />
                   <h4>Total : {totalPrice()}</h4>
                   {auth?.user?.address ? (
                    <>
                        <div className='mb-3'>
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            <button className='btn btn-outline-warning'
                            onClick={() => navigate('/dashboard/user/profile')}
                            >Update Address</button>
                        </div>
                    </>
                   ) : (
                    <div className='mb-3'>
                        {
                            auth?.token ? (
                                <button className='btn btn-outline-warning'
                                onClick={() => navigate('/dashboard/user/profile')}
                                >Update Address</button>
                            ) : (
                                <button className='btn btn-outline-warning'
                                onClick={() => navigate("/login", {
                                    state: '/cart',
                                })}
                                >Please Login To Checkout</button>
                            )
                        }
                    </div>
                   )}
                   <div className='mt-2'>
                        {
                            !clientToken || !cart?.length ? ("") : (
                                <>
                                    <DropIn 
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow:'vault'
                                            }
                                        }}
                                        onInstance={instance => setinstance(instance)}
                                    />
                                    <button className='btn btn-primary' 
                                    onClick={handlePayment} 
                                    disabled = {loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )
                        }
                        
                   </div>
                </div>

            </div>
        </div>
    </Layout>
  )
}

export default CartPage