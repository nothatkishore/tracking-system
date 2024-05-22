import React from 'react'
import { Navbar, Student, Location, Map } from './Components'
import { Read, Write } from './Temp'



const App = () => {
  return (
    <div className='h-screen w-full bg-slate-950'>
      <Navbar/>

      <div className='flex h-[90vh] border-t-[0.5px]'>

        <div className='w-full'>
          <Map />
        </div>

        <div className='  w-full flex flex-col text-white'>

            

            <div className='h-full'>
              <Student />
            </div>

            
            <div className='h-full'>

              <Location/>
            </div>

        </div>

      </div>

    </div>
  )
}

export default App

