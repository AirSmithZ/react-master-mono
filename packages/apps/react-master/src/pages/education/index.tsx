import React from 'react'
import Navigation from '../../components/navigation'
import { Outlet } from 'react-router-dom';
type Props = {}

export default function Education({}: Props) {
  return (
    <div className=' bg-slate-100'>
        <Navigation hide={true} />
        <Outlet />
    </div>
  )
}