import React from 'react'
import { Navbar, Student, Location, Map } from './Components'
import { Read, Write } from './Temp'


const App = () => {
  return (
    <div className='h-screen w-full bg-slate-950'>
      <Navbar/>

      <div className='flex h-[90vh] bg-lime-400'>

        <div className='bg-blue-400 w-full'>
          <Write/>
        </div>

        <div className='bg-red-300 w-full flex flex-col'>

            <div className='h-full bg-green-400'>
              <Read/>
            </div>

            <div className='h-full bg-green-500'>
              <Location/>
            </div>

        </div>

      </div>

    </div>
  )
}

export default App

