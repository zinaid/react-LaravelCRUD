import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const New = () => {
    const navigate = useNavigate();
    
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)

    const changeHandler = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        let limit = 1024*1024

        if(file['size'] > limit){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
                footer: 'Why do I have this error'
            })
        }

        setPhoto(event.target.files[0])
    }

    const createTask = async(event) =>{
        event.preventDefault()
        const formData = new FormData()
        
        formData.append('name', name)
        formData.append('description', description)
        formData.append('photo', photo)

        await axios.post("/api/add_task", formData)
            .then(({data})=> {
                toast.fire({
                    icon: 'success',
                    title: "Task added."
                })
                navigate("/")
            })
            .catch(({response})=> {
                toast.fire({
                    icon: 'error',
                    title: "Task is not added."
                })
            })
    }   

    return (
        <div className="w-full">
            <div className='flex flex-row w-full mb-2'>
                <div className='flex justify-start w-1/2'>
                    <h1 className='text-2xl'>CRUD TASKS</h1>
                </div>
                <div className='flex w-1/2 justify-end'>
                        <button className='bg-green-400 p-2 rounded-md text-white mr-2'>New Task</button>
                        <button onClick={() => navigate(-1)} className='bg-blue-400 p-2 rounded-md text-white'>Go back</button>
                </div>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input value={name} onChange={(event) => {setName(event.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea value={description} onChange={(event) => {setDescription(event.target.value)}}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                        Photo
                    </label>
                    <input onChange={changeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="photo" type="file" placeholder="Photo" />
                </div>
                <div className="flex items-center justify-end">
                    <button onClick={(event) => createTask(event)}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default New
