import { useEffect, useState } from 'react';
import './App.css';
import { Layout } from './Layout';
import { NavMenu } from './components/navmenu/NavMenu.jsx';
import { ComponentRoutes } from './components/ComponentRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="app-layout">

            <NavMenu />
            <div className="main-content">
                <ComponentRoutes />
            </div>
            {/*<h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}


            <StoreTable />*/ }

        </div>
    );
    
    async function populateWeatherData() {
        try {
            const response = await fetch('weatherforecast');
            if (!response.ok) {
                throw new Error('Http Error! status: ${response.status}');
            }
            const data = await response.json();
            setForecasts(data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export default App;