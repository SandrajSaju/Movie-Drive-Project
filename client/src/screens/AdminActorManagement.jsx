import React, { useEffect, useState} from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import AdminListActors from '../components/AdminListActors'
import axios from 'axios'

const AdminActorManagement = () => {
    const [allActors,setAllActors] = useState([])
    const fetchActors = async () => {
      const {data} = await axios.get('http://localhost:4000/admin/getallactors',{
          headers:{
              "adminauthorization":localStorage.getItem("adminToken")
          }
      });
      setAllActors(data)
  }
    useEffect(()=>{
        fetchActors();
    },[])

  return (
    <>
      <AdminHeader />
      <div className='flex flex-row'>
      <AdminSidebar />
      <AdminListActors actors={allActors} fetchActors={fetchActors}/>
      </div>
    </>
  )
}

export default AdminActorManagement