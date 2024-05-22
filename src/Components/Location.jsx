import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import axios from 'axios';

const Location = () => {
  const [latt, setLatt] = useState('000.000000');
  const [long, setLong] = useState('000.000000');
  const [geoFence, setFence] = useState('');

  const BLYNK_AUTH_TOKEN = 'R4ajiWQjT7dmBBoS0-jRWMnjsGK4l_d_';
  const VIRTUAL_PIN1 = 'V0';
  const VIRTUAL_PIN2 = 'V1';
  const VIRTUAL_PIN3 = 'V2';

  const getLocation = async () => {
    try {
      const tempLatt = await axios.get(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${VIRTUAL_PIN1}`);
      setLatt(tempLatt.data);
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const tempLong = await axios.get(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${VIRTUAL_PIN2}`);
      setLong(tempLong.data);
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const tempFence = await axios.get(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${VIRTUAL_PIN3}`);
      setFence(tempFence.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLocation();
    }, 2000); // Adjusted interval to 10 seconds to reduce request frequency

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div className='flex flex-col justify-evenly items-center h-full font-sans'>
      <div className='flex justify-evenly items-center w-full'>
        <Paper
          sx={{
            height: '200px',
            width: '250px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            background: '#1E0342',
            color: 'white'
          }}
          elevation={1}
        >
          <div className='flex flex-col justify-center items-center h-full'>
            <span className='font-light'>Latitude</span>
            <br />
            <span className='font-light'>{latt}</span>
          </div>
        </Paper>

        <Paper
          sx={{
            height: '200px',
            width: '250px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            background: '#1E0342',
            color: 'white'
          }}
          elevation={1}
        >
          <div className='flex flex-col justify-center items-center h-full'>
            <span className='font-light'>Longitude</span>
            <br />
            <span className='font-light'>{long}</span>
          </div>
        </Paper>
      </div>

      <div className='flex justify-evenly items-center w-full'>
        <Paper
          sx={{
            padding: '20px',
            fontSize: '22px',
            fontWeight: 'light',
            display: 'flex',
            flexDirection: 'column',
            background: '#1E0342',
            color: 'white',
            marginBottom: '10px',
          }}
        >
          <div>
            <span className='font-normal'>Fence status: </span>
            {geoFence}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Location;
