import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home.jsx';
import { StoreTable } from './stores/StoreTable';


export const ComponentRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<StoreTable />} />
            <Route path="/sales" element={<h1>Sales Details</h1>}></Route>
            <Route path="/customers" element={<h1>customer Details</h1>}> </Route>
            <Route path="/products" element={<h1>Product Details</h1>}></Route>
            {/*<Route path="/customers" component={CustomerTable} />
                        <Route path="/products" component={ProductTable} /> */}
        </Routes>
    );
};