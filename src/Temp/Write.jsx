import React, { useState } from 'react'
import { ref, set } from 'firebase/database'
import { database } from '../utils/firebase' 

const Write = () => 
{   
    const [dataValue, setDatavalue] = useState('')
    const handleSubmit = (event) =>
    {
        event.preventDefault()
        set(ref(database, 'Location'),
        {
            Latitude : dataValue,
            Longitude : '10',
        })

        .then(() => console.log('sucessful'))
        .catch((error) => console.error('Error:', error))
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder='Enter the data'
                    value={dataValue}
                    onChange={(event) => setDatavalue(event.target.value)}
                    className='border border-black m-[10px] p-[5px]'
                />

                <button
                    type='submit'
                    className='border border-black p-[5px]'
                >
                    Submit
                </button>
            </form>

        </div>
    )
}

export default Write
