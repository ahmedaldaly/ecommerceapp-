import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as motion from 'motion/react-client'
import BaseUrl from '../../../Api/BaseUrl'
const AllUsers = () => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function fetch() {
            try {
                const data =await axios.get (`${BaseUrl}/api/vi/users`)
                .then((data)=>{
                    setUser(data.data.data)
                    console.log(data.data.data)
                    setLoading(false)
                })
            }catch(err){console.log(err)
                setLoading(true)
            }
        }
        fetch()
    },[])

    async function delet(id) {
        try {
          await axios.delete(`${BaseUrl}/api/vi/users/${id}`);
          setUser((prevUsers) => prevUsers.filter((user) => user._id !== id)); // تحديث الحالة
        } catch (err) {
          console.log(err);
        }
      }

      async function edit(id ,admin) {
        try {
          await axios.put(`${BaseUrl}/api/vi/users/${id}`,{
            isAdmin:!admin,
          });
          setUser((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, isAdmin: !admin } : user
            )
          );
     // تحديث الحالة
        } catch (err) {
          console.log(err);
        }
      }

  return (
    <div className='w-full text-center'>{loading?<div>loading</div>:
        <motion.div
        initial={{ opacity: 0 ,marginTop:'100px'}}
        animate={{ opacity: 1 ,marginTop:'0px'}}
        transition={{ duration: 0.5 ,delay:2}}
      >
        <table className="w-11/12 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden mx-24">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            
            {user.map((item, i) => (
        
              <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.isAdmin ? (
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Admin</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">User</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button onClick={() => edit(item._id, item.isAdmin)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={()=>delet(item._id)} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    }</div>
  )
}

export default AllUsers