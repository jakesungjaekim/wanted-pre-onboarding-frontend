import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../config'
import useHandleInput from '../../../hooks/useHandleInput'



const SignupForm = () => { 
  const navigate = useNavigate()
  
  const [inputValues, handleInput, clearInputValues] = useHandleInput({
    email: '',
    password: '',
  })
  const { email, password} = inputValues;
  const emailVaild = email.includes('@')
  const passwordVaild = password.length >= 8
  const isVaild = emailVaild && passwordVaild 

  useEffect(()=>{
    setIsSignupDisabled(!(emailVaild&&passwordVaild) )
  },[emailVaild, passwordVaild])

  useEffect(()=>{
    if(localStorage.getItem('TOKEN')) {
      navigate('/todo')
    } 
    
  },[navigate])

  const [isSignupDisabled, setIsSignupDisabled] = useState(true);

  const handleSignup = () => {
    axios.post(API.SIGNUP, {
      email,
      password
    }).then((response) => {
      console.log(response)
      alert('회원가입 성공!')
      clearInputValues()
      navigate('/signin')
    })
    .catch((error) => {
      if(error.response.status === 400){
        console.log('에러1) 가입실패')
        alert("이미 가입된 이메일 입니다.")
      } else {
        console.log('에러2) 가입실패')
        alert('회원가입실패, 다시 시도해주세요.')
      }
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(isVaild) {
      handleSignup()
    } else {
      alert('회원가입 실패, 다시 시도해주세요.')
    }
  }



  return (
    <form onSubmit={handleSubmit}>
      <label data-testid="email-input" htmlFor='email' className='block text-2xl font-semibold'>이메일</label>
      <input type="email" placeholder='Enter Your Eamil-Address' name="email" value={email} onChange={handleInput} className='w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
      {
        ( email.length === 0 || email.includes('@') ) ? null : <p className='text-red-500'>이메일 형식이 올바르지 않습니다.</p>
      }
      <label data-testid="password-input" htmlFor='email' className='block text-2xl font-semibold'>비밀번호</label>
      <input type="password" placeholder='Enter Your Password' name="password" value={password} onChange={handleInput} className='w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
      {
        ( password.length === 0 || password.length >= 8 ) ? null : <p className='text-red-500'>비밀번호는 8자 이상이어야 합니다.</p>
      }
      <button data-testid="signup-button" type='submit' disabled={isSignupDisabled} className={`w-full p-6 mt-6 text-2xl font-semibold text-white ${isSignupDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-700'} rounded-md`}>
      
      회원가입
      </button>
    </form>
  )
}

export default SignupForm