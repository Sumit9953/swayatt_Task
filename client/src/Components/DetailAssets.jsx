import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailAssets = () => {

    const [asset , setAsset] = useState({})
    const params = useParams();
  const { id } = params;

    useEffect(  () => {
        axios.get(`http://localhost:4000/api/v1/getAsset/`+id)
          .then(response => setAsset(response.data))
          .catch(error => console.error('There was an error fetching the assets!', error));
      }, [id]);

      console.log("Asset" , asset);

  return  (
    <div>
    <h1 className='text-3xl font-bold text-center mb-20'>Asset Details</h1>
        <div  className="mb-4 mx-auto bg-zinc-300 w-[70%] p-10  border-2 border-gray-400">
            <h1 className='text-xl mb-5 font-bold'>MotorId : {asset.motorId}</h1>
            <h4 className="text mb-3 font-semibold">Name : {asset.name}</h4>
            <p className='text mb-3  text-gray-400'><span className='font-bold text-black'>Description :</span> {asset.description}</p>
            <p className='font-semibold mb-3 '><span className='font-bold text-black'>Location: </span>{asset.location}</p>
            <p className='mb-3'><span className='font-bold text-black'>Manufacturer :</span> {asset.manufacturer}</p>
            <p className='mb-3'><span className='font-bold text-black'>Model Number :</span> {asset.modelNumber}</p>
            <p className='mb-3'><span className='font-bold text-black'>Serial Number :</span> : {asset.serialNumber}</p>
            <p className='mb-3'><span className='font-bold text-black'>Status :</span> {asset.status}</p>
            <h2 className='font-semibold text-2xl mb-5 text-center'>Specifications</h2>
            <div className='flex gap-3 justify-between mb-2 mt-2 flex-wrap'>
                <p><span className='font-bold text-black'>Power :</span> {asset?.specifications?.power}</p>
                <p><span className='font-bold text-black'>Current :</span> {asset?.specifications?.current}</p>
                <p><span className='font-bold text-black'>Speed :</span> {asset?.specifications?.speed}</p>
                <p><span className='font-bold text-black'>Voltage :</span> {asset?.specifications?.voltage}</p>
            </div>
            <div className=''>
            {/* <button onClick={() => editAsset(asset)} className="bg-yellow-500 text-white px-4 py-2 mr-2">Edit</button>
            <button onClick={() => deleteAsset(asset._id)} className="bg-red-500 text-white px-4 py-2">Delete</button> */}
            </div>
          </div>
    </div>
  )
}

export default DetailAssets