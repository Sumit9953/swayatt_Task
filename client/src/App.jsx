import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import './index.css'
import { Outlet } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex'>
      <Sidebar />
      <div className="w-[85%] mx-auto absolute right-0   p-10">
      <Outlet />
      </div>
    </div>
  )
}

export default App
