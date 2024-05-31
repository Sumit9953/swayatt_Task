
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {

  const [assets, setAssets] = useState([]);
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/getAllticket');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };


  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/getAsset')
      .then(response => setAssets(response.data))
      .catch(error => console.error('There was an error fetching the assets!', error));
    fetchTickets()
  }, []);

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl text-center font-bold mb-20">Dashboard</h1>

    <div className="flex flex-col md:flex-row gap-10 justify-center">
      <div className="w-full md:w-1/4 mb-10 text-center h-40 p-4 text-3xl rounded-xl font-bold bg-yellow-200">
        Total Assets
        <h1 className="mt-6">{assets.length}</h1>
      </div>
      <div className="w-full  md:w-1/3 mb-10 text-center h-40 p-4 text-3xl rounded-xl font-bold bg-orange-300">
        Total Maintenance Ticket
        <h1 className="">{tickets.length}</h1>
      </div>
    </div>

    <p className="text-xl font-semibold mb-10  text-center">Overview of all motor assets and key metrics.</p>
    
    <div className="flex flex-wrap gap-3 justify-center">
      {assets.map(asset => (
        <div key={asset._id} className="w-full rounded-xl sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 transform transition duration-500 hover:scale-110 bg-zinc-300 border-2 border-gray-400 mb-4">
          <Link to={"/assets/" + asset._id}>
            <h1 className="text-xl font-bold">MotorId: {asset.motorId}</h1>
            <h4 className="text font-semibold">Name: {asset.name}</h4>
            <p className="text-sm text-gray-600"><span className="font-bold text-black">Description:</span> {asset.description}</p>
            <p className="font-semibold"><span className="font-bold text-black">Location:</span> {asset.location}</p>           
          </Link>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Dashboard;
