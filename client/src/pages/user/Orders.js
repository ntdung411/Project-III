import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [auth] = useAuth()

    const getOrders = async () => {
        try {
            setLoading(true)
            setError(null)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`)
            setOrders(data?.orders || [])
        } catch (error) {
            console.log(error)
            setError("Error fetching orders")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    return (
    <Layout title={"Dashboard - Orders"}>
        <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Orders</h1>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-danger">{error}</div>
                    ) : orders?.length > 0 ? (
                        orders.map((o, i) => (
                            <div className='border shadow' key={o?._id}>
                                <table className='table'>
                                    {/* ...existing table code... */}
                                </table>
                                <div className='container'>
                                    {o?.products?.map((p, j) => (
                                        <div className='row mb-2 card flex-row' key={p?._id}>
                                            <div className='col-md-4'>
                                                <img
                                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                                                    className="card-img-top"
                                                    alt={p?.name || 'Product'}
                                                    width="100px"
                                                    height="100px"
                                                />
                                            </div>
                                            <div className='col-md-8'>
                                                <p>{p?.name}</p>
                                                <p>{p?.description?.substring(0, 30) || 'No description available'}</p>
                                                <p>Price : {p?.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>
        </div>
    </Layout>
)
}

export default Orders;
