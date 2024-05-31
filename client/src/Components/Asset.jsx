// src/pages/Assets.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [clickAdd, setClickAdd] = useState(false);
  const [newAsset, setNewAsset] = useState({
    motorId: "",
    name: "",
    description: "",
    location: "",
    status: "",
    manufacturer: "",
    modelNumber: "",
    serialNumber: "",
    installationDate: "",
    lastMaintenanceDate: "",
    specifications: {
      power: "",
      voltage: "",
      current: "",
      speed: "",
    },
  });

  const [editing, setEditing] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/getAsset")
      .then((response) => setAssets(response.data))
      .catch((error) =>
        console.error("There was an error fetching the assets!", error)
      );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in newAsset.specifications) {
      setNewAsset({
        ...newAsset,
        specifications: { ...newAsset.specifications, [name]: value },
      });
    } else {
      setNewAsset({ ...newAsset, [name]: value });
    }
  };

  const addAsset = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/v1/AddAssets", newAsset)
      .then((response) => setAssets([...assets, response.data]))
      .catch((error) =>
        console.error("There was an error adding the asset!", error)
      );
    setClickAdd(false);
  };

  const deleteAsset = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/DeleteAssets/${id}`)
      .then(() => setAssets(assets.filter((asset) => asset._id !== id)))
      .catch((error) =>
        console.error("There was an error deleting the asset!", error)
      );
  };

  const editAsset = (asset) => {
    setEditing(true);
    setClickAdd(true);
    setCurrentAsset(asset);
    setNewAsset(asset);
  };

  const updateAsset = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:4000/api/v1/UpdateAsset/${currentAsset._id}`,
        newAsset
      )
      .then((response) => {
        setAssets(
          assets.map((asset) =>
            asset._id === currentAsset._id ? response.data : asset
          )
        );
        setEditing(false);
        setNewAsset({
          motorId: "",
          name: "",
          description: "",
          location: "",
          status: "",
          manufacturer: "",
          modelNumber: "",
          serialNumber: "",
          installationDate: "",
          lastMaintenanceDate: "",
          specifications: {
            power: "",
            voltage: "",
            current: "",
            speed: "",
          },
        });
        setCurrentAsset(null);
        setClickAdd(false);
      })
      .catch((error) =>
        console.error("There was an error updating the asset!", error)
      );
  };

  const handliCloseClick = () => {
    setNewAsset({
      motorId: "",
      name: "",
      description: "",
      location: "",
      status: "",
      manufacturer: "",
      modelNumber: "",
      serialNumber: "",
      installationDate: "",
      lastMaintenanceDate: "",
      specifications: {
        power: "",
        voltage: "",
        current: "",
        speed: "",
      },
    });
    setClickAdd(false);
    setEditing(false);
  };

  console.log("Asset", assets);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Assets</h1>
      {clickAdd ? (
        <div className="w-full md:w-4/5 mx-auto border-2 border-black bg-slate-300 p-4">
          <h1 className="text-2xl font-bold mb-4">Add Assets</h1>

          <form onSubmit={editing ? updateAsset : addAsset} className="mb-4">
            <div className="flex flex-wrap gap-3 items-center justify-around">
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Motor ID
                <input
                  type="text"
                  name="motorId"
                  value={newAsset.motorId}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Name
                <input
                  type="text"
                  name="name"
                  value={newAsset.name}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Description
                <input
                  type="text"
                  name="description"
                  value={newAsset.description}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Location
                <input
                  type="text"
                  name="location"
                  value={newAsset.location}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              
              <label className="block mb-2">
                Status
                <select
                  name="status"
                  value={newAsset.status}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Manufacturer
                <input
                  type="text"
                  name="manufacturer"
                  value={newAsset.manufacturer}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Model Number
                <input
                  type="text"
                  name="modelNumber"
                  value={newAsset.modelNumber}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Serial Number
                <input
                  type="text"
                  name="serialNumber"
                  value={newAsset.serialNumber}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Installation Date
                <input
                  type="date"
                  name="installationDate"
                  value={newAsset.installationDate}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Last Maintenance Date
                <input
                  type="date"
                  name="lastMaintenanceDate"
                  value={newAsset.lastMaintenanceDate}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <h3 className="font-bold mb-2 w-full">Specifications</h3>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Power (kW)
                <input
                  type="text"
                  name="power"
                  value={newAsset.specifications.power}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Voltage (V)
                <input
                  type="text"
                  name="voltage"
                  value={newAsset.specifications.voltage}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Current (A)
                <input
                  type="text"
                  name="current"
                  value={newAsset.specifications.current}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <label className="flex flex-col mb-2 w-full md:w-[45%]">
                Speed (RPM)
                <input
                  type="text"
                  name="speed"
                  value={newAsset.specifications.speed}
                  onChange={handleInputChange}
                  className="border border-black p-2"
                />
              </label>
              <div className="w-full flex flex-wrap justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 mb-2"
                >
                  {editing ? "Update Asset" : "Add Asset"}
                </button>
                <button
                  onClick={handliCloseClick}
                  className="bg-red-500 text-white px-4 py-2 mb-2"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-3 justify-center">
            {assets.map((asset) => (
              <div
                key={asset._id}
                className="mb-4 bg-slate-300 w-full sm:w-[45%] md:w-[30%] lg:w-[20%] p-4 transform transition duration-500 hover:scale-110 border-2 border-gray-400"
              >
                <Link to={"/assets/" + asset._id}>
                  <h1 className="text-xl font-bold">
                    MotorId : {asset.motorId}
                  </h1>
                  <h4 className="text font-semibold">Name : {asset.name}</h4>
                  <p className="text-sm text-gray-400">
                    <span className="font-bold text-black">Description :</span>{" "}
                    {asset.description}
                  </p>
                  <p className="font-semibold">
                    <span className="font-bold text-black">Location: </span>
                    {asset.location}
                  </p>
                </Link>
                <div className="mt-4">
                  <button
                    onClick={() => editAsset(asset)}
                    className="bg-yellow-500 text-white px-4 py-2 mr-2 mb-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAsset(asset._id)}
                    className="bg-red-500 text-white px-4 py-2 mb-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="bg-blue-500 px-10 py-3 rounded-xl transform transition duration-500 hover:scale-110 text-white"
              onClick={() => setClickAdd(true)}
            >
              Add Asset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assets;
