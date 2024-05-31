// src/pages/MaintenanceTickets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MaintenanceTickets() {
  const [click , setClick] = useState(false)
  const [tickets, setTickets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    assetId: '',
    issueDescription: '',
    dateRaised: '',
    status: 'Open',
  });
  const [editing, setEditing] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
    fetchAssets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/getAllticket');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/getAsset')
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  const addTicket = async (e) => {
    e.preventDefault();
    if (!newTicket.assetId || !newTicket.issueDescription || !newTicket.dateRaised) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/AddTicket', newTicket);
      setTickets([...tickets, response.data]);
      setNewTicket({
        assetId: '',
        issueDescription: '',
        dateRaised: '',
        status: 'Open',
      });

      setClick(false);
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/DeleteTicket/${id}`);
      setTickets(tickets.filter(ticket => ticket._id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const editTicket = (ticket) => {
    setEditing(true);
    setClick(true)
    setCurrentTicket(ticket);
    setNewTicket(ticket);
  };

  const updateTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/UpdateTicket/${currentTicket._id}`, newTicket);
      setTickets(tickets.map(ticket => (ticket._id === currentTicket._id ? response.data : ticket)));
      setEditing(false);
      setNewTicket({
        assetId: '',
        issueDescription: '',
        dateRaised: '',
        status: 'Open',
      });
      setCurrentTicket(null);
      setClick(false)
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleClose = () => {
    setNewTicket({
      assetId: '',
      issueDescription: '',
      dateRaised: '',
      status: 'Open',
    });
    setClick(false);
  }

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl text-center font-bold mb-20">Maintenance Tickets</h1>
    {click ? (
      <form onSubmit={editing ? updateTicket : addTicket} className="mb-4 p-4 w-full sm:w-full md:w-1/2 mx-auto bg-slate-200 rounded-lg">
        <label className="block mb-2">
          Asset
          <select
            name="assetId"
            value={newTicket.assetId}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full rounded-md"
          >
            <option value="">Select an asset</option>
            {assets.map(asset => (
              <option key={asset._id} value={asset.motorId}>
                {asset.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          Issue Description
          <input
            type="text"
            name="issueDescription"
            value={newTicket.issueDescription}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full rounded-md"
          />
        </label>
        <label className="block mb-2">
          Date Raised
          <input
            type="date"
            name="dateRaised"
            value={newTicket.dateRaised}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full rounded-md"
          />
        </label>
        <label className="block mb-2">
          Status
          <select
            name="status"
            value={newTicket.status}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full rounded-md"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>
        <div className="flex  justify-between">
          <button type="submit" className="bg-blue-500  rounded-lg text-white sm:px-1 sm:py-2 px-4 py-2">
            {editing ? 'Update Ticket' : 'Add Ticket'}
          </button>
          <button onClick={handleClose} type="button" className="bg-red-500  rounded-lg text-white px-4 py-2">
            Close
          </button>
        </div>
      </form>
    ) : (
      <>
        <div className="flex gap-2 flex-wrap justify-center">
          {tickets.map(ticket => (
            <div key={ticket._id} className="mb-4 rounded-md bg-slate-400 p-4 w-full sm:w-[45%] md:w-[30%] border">
              <h2 className="text-xl">Ticket for Asset ID: {ticket.assetId}</h2>
              <p>{ticket.issueDescription}</p>
              <p>Date Raised: {ticket.dateRaised.substring(0, 10)}</p>
              <p>Status: {ticket.status}</p>
              <div className="flex justify-between mt-4">
                <button onClick={() => editTicket(ticket)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
                  Edit
                </button>
                <button onClick={() => deleteTicket(ticket._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button onClick={() => setClick(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add Ticket
          </button>
        </div>
      </>
    )}
  </div>
  );
}

export default MaintenanceTickets;
