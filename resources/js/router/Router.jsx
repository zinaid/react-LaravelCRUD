import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Index from '../components/tasks/Index'
import New from '../components/tasks/New'
import Edit from '../components/tasks/Edit'
import NotFound from '../NotFound'

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/*" element={<NotFound />} /> 
        <Route path="/new_task" element={<New />} />
        <Route path="/edit_task/:id" element={<Edit />} />
      </Routes>
    </div>
  )
}

export default Router
