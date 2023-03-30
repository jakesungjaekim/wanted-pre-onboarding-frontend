import React from 'react'
import SignupForm from './components/SignupForm'

const Signup = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-rose-50'>
    <div className='flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0'>
      <div className='p-6 md:p-20'>
        <h2 className='mb-5 text-4xl font-bold'>회원가입</h2>
        <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
          Welcome to Wanted Challenge!! Let`s Join Us!
        </p>
        <SignupForm />
      <div className='mt-12 border-b border-b-gray-300'></div>
      </div>
    </div>
   </div>
  )
}

export default Signup