import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Index from '../components/tasks/Index'
import New from '../components/tasks/New'

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

export default Router
