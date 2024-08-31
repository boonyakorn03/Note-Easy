import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Routes,
  } from 'react-router-dom'
  
  import Login from './components/Login'
  import Register from './components/Register'
  import Main from './components/Main'
  import Sidebar from './components/Sidebar'
  import Dashboad from './components/dashboard/Dashboad'

  const elements = createRoutesFromElements(
    <>
    <Routes> 
      <Route path='/login'element={<Login />} />
      <Route path='/main' element={<Main />} />
      <Route path='/sideber' element={<Sidebar />} />
      <Route path='/dashboard' element={<Dashboad />} />
      </Routes>
    </>
  )
  
  const router = createBrowserRouter(elements)
  
  export default router