// src/pages/Assets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddAssets() {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    motorId: '',
    name: '',
    description: '',
    location: '',
    status: '',
    manufacturer: '',
    modelNumber: '',
    serialNumber: '',
    installationDate: '',
    lastMaintenanceDate: '',
    specifications: {
      power: '',
      voltage: '',
      current: '',
      speed: ''
    }
  });
  const [editing, setEditing] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);

  // useEffect(() => {
  //   axios.get('http://localhost:4000/api/v1/getAsset')
  //     .then(response => setAssets(response.data))
  //     .catch(error => console.error('There was an error fetching the assets!', error));
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in newAsset.specifications) {
      setNewAsset({
        ...newAsset,
        specifications: { ...newAsset.specifications, [name]: value }
      });
    } else {
      setNewAsset({ ...newAsset, [name]: value });
    }
  };

  console.log("Assets" , newAsset);

  const addAsset = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/v1/AddAssets', newAsset)
      .then(response => setAssets([...assets, response.data]))
      .catch(error => console.error('There was an error adding the asset!', error));
  };

  const deleteAsset = (id) => {
    axios.delete(`/api/assets/${id}`)
      .then(() => setAssets(assets.filter(asset => asset._id !== id)))
      .catch(error => console.error('There was an error deleting the asset!', error));
  };

  const editAsset = (asset) => {
    setEditing(true);
    setCurrentAsset(asset);
    setNewAsset(asset);
  };

  const updateAsset = (e) => {
    e.preventDefault();
    axios.put(`/api/assets/${currentAsset._id}`, newAsset)
      .then(response => {
        setAssets(assets.map(asset => (asset._id === currentAsset._id ? response.data : asset)));
        setEditing(false);
        setNewAsset({
          motorId: '',
          name: '',
          description: '',
          location: '',
          status: '',
          manufacturer: '',
          modelNumber: '',
          serialNumber: '',
          installationDate: '',
          lastMaintenanceDate: '',
          specifications: {
            power: '',
            voltage: '',
            current: '',
            speed: ''
          }
        });
        setCurrentAsset(null);
      })
      .catch(error => console.error('There was an error updating the asset!', error));
  };

  console.log("Asset" , assets);

  return (
    <div className=''>
      <h1 className="text-2xl font-bold mb-4">Assets</h1>

      <div className='w-[50%] p-4 border-2 border-black'>

      <form  onSubmit={editing ? updateAsset : addAsset} className="mb-4">
      <div className='flex gap-3 items-center justify-around  flex-wrap'>

        <label className="gap-2 mb-2">
          Motor ID
          <input
            type="text"
            name="motorId"
            value={newAsset.motorId}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className=" mb-2">
          Name
          <input
            type="text"
            name="name"
            value={newAsset.name}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
      
        <label className="block mb-2">
          Description
          <input
            type="text"
            name="description"
            value={newAsset.description}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Location
          <input
            type="text"
            name="location"
            value={newAsset.location}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Status
          <input
            type="text"
            name="status"
            value={newAsset.status}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Manufacturer
          <input
            type="text"
            name="manufacturer"
            value={newAsset.manufacturer}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Model Number
          <input
            type="text"
            name="modelNumber"
            value={newAsset.modelNumber}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Serial Number
          <input
            type="text"
            name="serialNumber"
            value={newAsset.serialNumber}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Installation Date
          <input
            type="date"
            name="installationDate"
            value={newAsset.installationDate}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Last Maintenance Date
          <input
            type="date"
            name="lastMaintenanceDate"
            value={newAsset.lastMaintenanceDate}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <h3 className="font-bold mb-2">Specifications</h3>
        <label className="block mb-2">
          Power (kW)
          <input
            type="text"
            name="power"
            value={newAsset.specifications.power}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Voltage (V)
          <input
            type="text"
            name="voltage"
            value={newAsset.specifications.voltage}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Current (A)
          <input
            type="text"
            name="current"
            value={newAsset.specifications.current}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <label className="block mb-2">
          Speed (RPM)
          <input
            type="text"
            name="speed"
            value={newAsset.specifications.speed}
            onChange={handleInputChange}
            className="border ml-3 border-black p-2 mb-2 "
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editing ? 'Update Asset' : 'Add Asset'}
        </button>
        </div>
      </form>
      </div>

      
    </div>
  );
}

export default AddAssets;
