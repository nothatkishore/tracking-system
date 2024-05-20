import { ref, onValue } from 'firebase/database';
import { database } from '../utils/firebase' 
import React, { useEffect, useState } from 'react'

const Read = () => 
{
    const [data, setData] = useState('')

    useEffect(() =>
    {
        const data_reference = ref(database, 'Location');
        const getValue = onValue(data_reference, (temp) =>
        {
            const value = temp.val();
            setData(value)
        });

        return () => getValue();
    }, [])

    console.log(data)

    return (
        <div>
            Sample data
        </div>
    )
}

export default Read
