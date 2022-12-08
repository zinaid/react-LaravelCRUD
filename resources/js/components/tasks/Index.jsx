import React, { useEffect, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Index = () => {
const [tasks, setTasks] = useState([]);
const navigate = useNavigate();

useEffect(()=>{
    getTasks()
}, [])
  
const getTasks = async() =>{

    await axios.get("/api/tasks")
        .then(({data})=> {
            setTasks(data.tasks)
        })
}

const deleteTask = async(id) =>{
    
        Swal.fire({
            title: 'Are you sure',
            text: "You can't revert",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it'
        })
        .then(function(result) {
            if(result.value){
            axios.delete('api/tasks/'+id)
            toast.fire({
                icon: 'success',
                title: "Task deleted."
            })
            }
            getTasks();
        })
    }

const editTaskNavigation = (id) => {
    navigate('/edit_task/'+id);
}
  return (
    <div className='flex flex-col'>
        <div className='flex flex-row w-full mb-2'>
            <div className='flex justify-start w-1/2'>
                <h1 className='text-2xl'>CRUD TASKS</h1>
            </div>
            <div className='flex w-1/2 justify-end'>
                <Link to="/new_task">
                    <button className='bg-green-400 p-2 rounded-md text-white'>Add Task</button>
                </Link>
            </div>
        </div>
        <div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                 <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                         <tr>
                             <th scope="col" className="py-3 px-6">
                                 Name
                             </th>
                             <th scope="col" className="py-3 px-6">
                                 Description
                             </th>
                             <th scope="col" className="py-3 px-6">
                                 Photo
                             </th>
                             <th scope="col" className="py-3 px-6">
                                 <span className="sr-only">Edit</span>
                             </th>
                         </tr>
                     </thead>
                     <tbody>
                        { tasks.length > 0 ?
                            tasks.map((item, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="py-4 px-6">
                                    {item.name}
                                </td>
                                <td className="py-4 px-6">
                                    {item.description}
                                </td>
                                <td className="py-4 px-6">
                                    {item.photo}
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <button onClick={()=>editTaskNavigation(item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</button>
                                    <button onClick={()=>deleteTask(item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                             )) : 'No data'
                        }
                             
                            
                     </tbody>
                 </table>
             </div>
        </div>
    </div>
  )
}

export default Index
