import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ComponentRoutes } from '../ComponentRoutes';
import CustomerApiServices from '../../services/CustomerServices';

//Task1 Using Function component
const AddCustomer = () => {
    const [customer, setCustomer] = useState({ id: 0, firstname: '', lastname: '', dateOfBirth: ''})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            const customerData = await CustomerApiServices.CreateCustomer(customer);
            if (customerData.id != 0) {
                setSuccessMsg("Customer Added successfully");
                setCustomer({ id: 0, firstname: '', lastname: '', dateOfBirth: '' }); // Reset form fields
            }
        } catch (error) {
            setError('Failed to add customer', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Customer Details</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
            <form onSubmit={handleSubmit}>
                <div disabled={loading}>
                    <label for="fname" >First Name:</label>
                    {//using prev to not change the other key values
                    }
                    <input id="fname" type="text" value={customer.firstname} onChange={(e) => setCustomer((prev) => ({ ...prev, firstname: e.target.value }))} required /> 
                    <br />
                    <br />
                    <label for="lname" >Last Name:</label>
                    <input id="lname" type="text" value={customer.lastname} onChange={(e) => setCustomer((prev) => ({...prev, lastname: e.target.value}))} required />
                    <br />
                    <br />
                    <label for="dob" >Last Name:</label>
                    <input id="dob" type="date" value={customer.dateOfBirth} onChange={(e) => setCustomer((prev) => ({ ...prev, dateOfBirth: e.target.value}))} required />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding Customer...':'Add Customer' }
                    </button>
                    <Link to='/customers' style={{marginLeft:'20px'} }>Back To Customers</Link>
                </div>
            </form>

        </div>
    );
};

export default AddCustomer;