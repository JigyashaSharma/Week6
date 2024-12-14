import axios from 'axios';
import error from 'react';
const CustomerEndpoint = "/api/customer";

//Task1: Customer services using fetch
//Haven't coded the pagination logic yet
const CustomerApiServices = {
    async GetCustomers(pageNumber = 1, pageSize = 10) {
        try {
            //const response = await axios.get(CustomerEndpoint);
            /*const response = await axios.get(CustomerEndpoint, {
                params: {
                    pageNumber,
                    pageSize
                }
            });*/
            const url = `${ CustomerEndpoint }?pageNumber=${ pageNumber }&pageSize=${ pageSize }`;
            const response = await fetch(url);
            //return response.data;
            if (!response.ok) {
                throw new Error('Http Error! status: ${response.status}');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching items: ", error);
            throw error;
        }
    },

    async CreateCustomer(newCustomer) {
        try {
            const response = await fetch(
                CustomerEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer)
            });

            if (!response.ok) {
                throw new Error('Http Error! status: ${response.status}');
            }
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error("Error creating items: ", error);
            throw error;
        }
    }
}

export default CustomerApiServices;