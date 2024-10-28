import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home.jsx';
import { StoreTable } from './stores/StoreTable';
import CustomerTable  from './customers/CustomerTable';
import AddCustomer from './customers/AddCustomer.jsx'


export const ComponentRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<StoreTable />} />
            <Route path="/sales" element={<h1>Sales Details</h1>}></Route>
            <Route path="/customers" element={<CustomerTable />}> </Route>
            <Route path="/products" element={<h1>Product Details</h1>}></Route>
            <Route path="/add-customer" component={AddCustomer} />
            {/*<Route path="/customers" component={CustomerTable} />
                        <Route path="/products" component={ProductTable} /> */}
        </Routes>
    );
};