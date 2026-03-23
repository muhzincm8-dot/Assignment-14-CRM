import { Outlet } from "react-router-dom"
import React from 'react'
import Navbar from "../components/Navbar"

function Root() {
  return (
    <div className="pt-15 min-h-screen">
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default Root