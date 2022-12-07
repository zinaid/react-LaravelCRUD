# TUTORIAL

First create a new laravel project with command:

```composer create-project laravel/laravel crudReact```

For this tutorial we are going to use MySql database so we need that service also. We may use for eq. Docker or Xampp (as we are going in this case). Then we change .env file and rename our database as react-crud.

After that we create model named Task with a command:

```php artisan make:model Task -mcr```

M means migration, c means controller and r says that our controller has predefined structure with all standard methods and includes.

Next we will modify our migration for tasks. It will have these columns:

```
public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('photo')->nullable();
            $table->integer('status')->default(0);
            $table->integer('level')->default(0);
            $table->timestamps();
        });
    }
```

Next we migrate these tables with ```php artisan migrate```. After this part we have created our database crud-react with the tables inside migrations. 

Now we proceed and install react and react-dom. We do this in our project root directory with this command.

```
npm install react@latest react-dom@latest
```

Our react app will be placed inside resources/js. We will work with jsx files. JSX is a React extension for javascript syntax and is commonly used for writing React components, so we will change our app.js into index.jsx.

We also use Vite for our assets bundling and as our live server for frontend. And because we decided to use jsx we need to modify vite.config.js to read input from resources/js/index.jsx.

```
input: ['resources/css/app.css', 'resources/js/index.jsx'],
```

Also we need to include react plugin for vite. Next npm command can do that for us:

```
npm install --save-dev @vitejs/plugin-react --force
```

Then we modify vite:

```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/index.jsx'],
            refresh: true,
        }),
    ],
});
```

We have already renamed app.js into index.jsx and it will be our central file for React. We will also create components folder where we will put our React components.

We create App component as:

```
import React from 'react'

const app = () => {
  return (
    <div>
      <p>This is a div.</p>
    </div>
  )
}

export default app
```

Also, we change index.jsx to:

```
import './bootstrap';

import React from 'react';
import ReactDOM  from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Inside our view welcome.blade.php we delete all body and create one div with id="root". Also we include vite in head with these two lines:

```
@viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/index.jsx'])
```
Next we start our vite server with npm run dev. And after that we should see our message inside App.jsx.

Next we add some styling to our div inside app.css.

For all components that are for our tasks we will create subfolder inside components named tasks. Inside we will create first component named Index.jsx.

```
import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index
```

In Laravel we can create custom error pages eg.404 page that is displayed when we can't find url. We just have to create errors subfolder inside views and inside create blade that corresponds with http error response eg. 404.blade.php.

Inside js we will create router subfolder and inside a router component.

```
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Index from '../components/tasks/Index'

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />}></Route>
      </Routes>
    </div>
  )
}

export default Router
```

In our App.jsx we include Router. 

```
import React from 'react'
import Router from './router/Router';

const app = () => {
  return (
    <div className='section__padding section__margin'>
      <Router />
    </div>
  )
}

export default app
```

For quick stylization we will install tailwind.

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Modify tailwind.config.js to look our js and jsx files, as well as our blade files:
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add tailwind directives to app.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

After that we can modify Index.jsx to return a table of taks and to have a button that takes us to Adding New Taks.

```
import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
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
            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                 <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                         <tr>
                             <th scope="col" className="py-3 px-6">
                                 Product name
                             </th>
                             <th scope="col" className="py-3 px-6">
                                 Color
                             </th>
                             <th scope="col" className="py-3 px-6">
                                 Category
                             </th>
                             <th scope="col" className="py-3 px-6">
                                 Price
                             </th>
                             <th scope="col" className="py-3 px-6">
                                 <span className="sr-only">Edit</span>
                             </th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                             <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                 Apple MacBook Pro 17"
                             </th>
                             <td className="py-4 px-6">
                                 Sliver
                             </td>
                             <td className="py-4 px-6">
                                 Laptop
                             </td>
                             <td className="py-4 px-6">
                                 $2999
                             </td>
                             <td className="py-4 px-6 text-right">
                                 <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                             </td>
                         </tr>
                         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                             <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                 Microsoft Surface Pro
                             </th>
                             <td className="py-4 px-6">
                                 White
                             </td>
                             <td className="py-4 px-6">
                                 Laptop PC
                             </td>
                             <td className="py-4 px-6">
                                 $1999
                             </td>
                             <td className="py-4 px-6 text-right">
                                 <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                             </td>
                         </tr>
                         <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                             <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                 Magic Mouse 2
                             </th>
                             <td className="py-4 px-6">
                                 Black
                             </td>
                             <td className="py-4 px-6">
                                 Accessories
                             </td>
                             <td className="py-4 px-6">
                                 $99
                             </td>
                             <td className="py-4 px-6 text-right">
                                 <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                             </td>
                         </tr>
                     </tbody>
                 </table>
             </div>
        </div>
    </div>
  )
}

export default Index
```

Next step is to define a route ```new_task``` inside Router.jsx. Don't forget to add a new component New.jsx inside components/tasks.
```
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/new_task" element={<New />} />
      </Routes>
    </div>
  )
}
```

Now we plan to create a new form inside New.jsx. In this form we will have three inputs name, description and file. 

```
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const New = () => {
    /* Navigate is used to return to list */
    const navigate = useNavigate();
    
    /* useState Hooks for setting values of name, description and photo */
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)

    /* Handler for file */
    const changeHandler = (event) => {
        let file = event.target.files[0];
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

    /* onClick button function */
    const createTask = async(event) =>{
        /* disabling redirect after submit */
        event.preventDefault()
        /* defining FormData and appending values */
        const formData = new FormData()
        
        formData.append('name', name)
        formData.append('description', description)
        formData.append('photo', photo)

        /* axios request to API with success and catch */
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

```

If we want to use sweetalert2 we need to install it with ```npm install sweetalert2``` and define it inside index.js.

```
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
window.Swal = Swal
const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProfressBar: true,
})

window.toast = toast

```

Now we move to creating first api endpoint and define route inside api.php (Don't forget to add Task model inside api.php).

```
Route::post('add_task', [TaskController::class, 'store'])->name('add_task');
```

Next we modify Task model and add fillables:

```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'photo',
        'status',
        'level',
    ];
}
```

We move to our TaskController and create all logic behind storing Task and image. We will use validate so we can include validator in the controller ``` use Illuminate\Support\Facades\Validator; ```

Method store is created as:

```
 public function store(Request $request)
    {
        /* Create object */
        $task = new Task();
        /* Assign attributes that are string */
        $task->name = $request->name;
        $task->description = $request->description;

        $imagesName = [];
        $response = [];

        /* validate photo */
        $validator = Validator::make($request->all(),
            [
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }

        if($request->has('photo')) {
                /* create filename */
                $filename = time().rand(1,10). '.'.$request->file('photo')->getClientOriginalExtension();

                /* save inside public uploads*/
                $request->file('photo')->move('uploads/', $filename);

                $task->photo = $filename;

              $response["status"] = "successs";
              $response["message"] = "Success! image(s) uploaded";
        }

        else {
            $response["status"] = "failed";
            $response["message"] = "Failed! image(s) not uploaded";
        }
    
        $task->save();
        /* We returned response because we used this messages in testing with Insomnia (tool for api testing) but we can use these responses for our frontend, too, where we could use that messages and display them with sweetalert. */
        return $response;
    }
```

Next we will make api call for listing all our Tasks in Index.jsx. That will be GET api call on index method inside TaskController.

```
public function index()
    {
        $tasks = Task::all();

        return response()->json([
            'tasks' => $tasks
        ], 200);
    }
```

The response from axios call will be assigned to tasks variable. Function getTasks will be called by useEffect on load.

```
useEffect(()=>{
    getTasks()
}, [])
  
const getTasks = async() =>{

    await axios.get("/api/tasks")
        .then(({data})=> {
            setTasks(data.tasks)
        })
}  
```

Now we add another route in router for edit and a new jsx file Edit.jsx inside components.

```
<Route path="/edit_task/:id" element={<Edit />} />
```

And we modify Edit.jsx file:

```
import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = () => {

  const navigate = useNavigate();
  const {id} = useParams()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(()=>{
    getTask();
  }, [])

  const getTask = async () => {
    await axios.get(`/api/tasks/${id}`)
      .then(({data})=>{
      const  {photo, name, description} = data.task
      setName(name)
      setDescription(description)
    })
  }

  const updateTask = async(event) =>{
    event.preventDefault()
    const formData = new FormData()
    
    formData.append('name', name)
    formData.append('description', description)

    await axios.post(`/api/tasks/${id}`, formData)
        .then(({data})=> {
            toast.fire({
                icon: 'success',
                title: "Task updated."
            })
            navigate("/")
        })
        .catch(({response})=> {
            toast.fire({
                icon: 'error',
                title: "Task is not updated."
            })
            console.log(response)
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
                <input value= {name} onChange = {(event)=>{setName(event.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea value= {description} onChange={(event) => {setDescription(event.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" />
            </div>
            <div className="flex items-center justify-end">
                <button onClick = {updateTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Save
                </button>
            </div>
        </form>
    </div>
  )
}

export default Edit

```

We need to define route for backend and create logic inside TaskController method update.

```
Route::post('tasks/{id}', [TaskController::class, 'update'])->name('tasks');
```

And the logic inside controller.

```
 public function update(Request $request, $id)
{
    $task = Task::find($id); 
    $task->name = $request->name;
    $task->description = $request->description;
    $task->save();

    return response()->json([
        'task' => $task
    ], 200);
}
```