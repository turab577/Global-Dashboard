'use client'
import React from 'react'
import AuthForm from '@/app/ui-components/authForm'
export default function Register() {
  return (
    <div className='!overflow-hidden max-h-[100vh]'>
      <AuthForm mode='register' onSubmit={()=>{console.log("submitted")}} />
    </div>
  )
}
