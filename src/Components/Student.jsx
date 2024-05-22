import { Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../utils/firebase';
import axios from 'axios';

const Student = () => {
  const [recent_img, setRecent_img] = useState('');
  const [student1, setStudent1] = useState('');
  const [student2, setStudent2] = useState('');

  const BLYNK_AUTH_TOKEN = 'yZSCYMYk9v5iTz47mX-3hoA5ksjFqfWv';
  const VIRTUAL_PIN1 = 'V3';
  const VIRTUAL_PIN2 = 'V4';

  const getStudent = async () => {
    try {
      const temp_student1 = await axios.get(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${VIRTUAL_PIN1}`);
      setStudent1(temp_student1.data);
    } catch (error) {
      console.error(error);
    }

    try {
      const temp_student2 = await axios.get(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${VIRTUAL_PIN2}`);
      setStudent2(temp_student2.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getStudent();
    }, 2000);

    const data_reference = ref(database, 'rimage/url');
    const unsubscribe = onValue(data_reference, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        // Add a unique query parameter to the image URL to prevent caching
        setRecent_img(`${value}?t=${new Date().getTime()}`);
      }
    });

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      off(data_reference, 'value', unsubscribe);
    };
  }, []);

  return (
    <div className='h-full flex flex-col justify-center'>
      <p className='w-full text-center text-3xl font-thin mt-[20px]'>Student details</p>
      <div className='text-white p-[20px] flex flex-row h-full gap-[30px]'>

        <div className='bg-[#1E0342] h-full w-full flex flex-col rounded-xl'>
          <p className='m-[20px] text-3xl font-light'>Photograph</p>
          <div className='m-[20px] border h-full'>
            <img
              src={recent_img}
              alt="student image"
              className='h-full'
            />
          </div>
        </div>

        <div className='bg-[#1E0342] w-full p-[20px] h-full rounded-xl flex flex-col justify-evenly'>
          <Paper
            sx={{
              background: '#F6F5F2',
              padding: '20px',
              height: '150px'
            }}
          >
            <div className='flex flex-col justify-evenly h-full'>
              <p className='text-xl font-light'><span className='font-medium'>Name :</span> Nipples</p>
              <p className='text-xl font-light'><span className='font-medium'>Status :</span> {student1}</p>
            </div>
          </Paper>

          <Paper
            sx={{
              background: '#F6F5F2',
              padding: '20px',
              height: '150px'
            }}
          >
            <div className='flex flex-col gap-[10px] justify-evenly h-full'>
              <p className='text-xl font-light'><span className='font-medium'>Name :</span> Janu</p>
              <p className='text-xl font-light'><span className='font-medium'>Status :</span> {student2}</p>
            </div>
          </Paper>
        </div>
      </div>
      <p className='text-3xl font-thin w-full text-center'>Geographic details</p>
    </div>
  );
};

export default Student;
