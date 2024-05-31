import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  
    const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }else{
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set the correct state on initial load
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`flex fixed flex-col h-screen ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white`}>
      <button onClick={toggleSidebar} className="p-4 focus:outline-none">
        {isOpen ? 'Collapse' : 'Expand'}
      </button>
      <nav className="mt-10">
        <Link to="/" className="flex gap-3 items-center py-2.5 px-4 hover:bg-gray-700">
          <img className='w-10 h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRE6_I6CN0lEXdkIloRaeeJgJwlWQvBKAHBA&s" alt="" srcset="" /> 
          {isOpen && <p>Dashboard</p>}
        </Link>
        <Link to="/assets" className="flex gap-3 items-center py-2.5 px-4 hover:bg-gray-700">
        <img className='w-10 h-10' src="data:image/png;base64,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" alt="" srcset="" /> 
        {isOpen && <p>Assets</p>}
        </Link>
        <Link to="/tickets" className="flex gap-3 items-center py-2.5 px-4 hover:bg-gray-700">
        <img className='w-10 h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCt9cRMpgviNHho99pSzVJg51lYgz3RLjYQ&s" alt="" srcset="" /> 
        {isOpen && <p>Maintenance Tickets</p>}
        </Link>
      </nav>
    </div>
  );

}

export default Sidebar
