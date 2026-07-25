import Navbar from '@/components/Navbar'
import React from 'react'

function authLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Navbar/> 
        {children}
    </div>
  )
}

export default authLayout