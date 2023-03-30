import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../config'
import useHandleInput from '../../../hooks/useHandleInput'

const LoginForm = () => {
  const navigate = useNavigate()

  const [inputValues, handleInput, clearInputValues] = useHandleInput({
    email: '',
    password: '',
  })
  const { email, password } = inputValues;
  const emailVaild = email.includes('@') 
  const passwordVaild = password.length >= 8  
  const isVaild = emailVaild && passwordVaild 
  
  useEffect(()=>{
    setIsLoginDisabled(!(emailVaild&&passwordVaild) )
  },[emailVaild, passwordVaild])
  
  useEffect(()=>{
    if(localStorage.getItem('TOKEN')) {
      navigate('/todo')
    } else {
      navigate('/signin')
    }
  },[])

  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  
  const handleLogin = () => {
    axios.post(API.LOGIN, {
      email,
      password
    })
    .then((response) => {
      console.log(response)
      if(response.status === 200) {
        localStorage.setItem('TOKEN', response.data.access_token)
        alert('로그인 성공!')
        clearInputValues()
        navigate('/todo')
      }
  })
    .catch((error) => {
      if(error.response.status === 400){
        console.log('에러1) 로그인실패')
        alert("이메일 혹은 비밀번호가 올바르지 않습니다.")
      } else {
        console.log('에러2) 로그인실패')
        alert('로그인실패, 다시 시도해주세요.')
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isVaild) {
      handleLogin()
    } else {
      alert('로그인 실패, 다시 시도해주세요.')
    }
  }

  // Navigate Function 
  const goToSignup = () => {
    navigate('/signup')
  }


  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
          <label htmlFor='email' className='block text-2xl font-semibold'>이메일</label>
          <input data-testid="email-input" type="email" placeholder='Enter Your Eamil-Address' name="email" value={email} onChange={handleInput} className='w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
          {
            ( email.length === 0 || emailVaild ) ? null : <p className='text-red-500'>이메일 형식이 올바르지 않습니다.</p>
          }
          <label htmlFor='email' className='block text-2xl font-semibold'>비밀번호</label>
          <input data-testid="password-input" type="password" placeholder='Enter Your Password' name="password" value={password} onChange={handleInput} className='w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
          {
            (password.length === 0 || passwordVaild) ? null : <p className='text-red-500'>비밀번호는 8자 이상이어야 합니다.</p>
          }
          <div className='flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0'>
            <div className='font-thin cursor-pointer text-cyan-700' onClick={goToSignup}>회원가입 하러가기</div>
            <button data-testid="signin-button" disabled={isLoginDisabled}
            className={`w-full md:w-auto flex justify-center items-center mt-4 p-6 space-x-4 font-bold text-white shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-200 ${isLoginDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-700'}`}
             >
              <span>
                로그인하기
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="13" y1="18" x2="19" y2="12" />
                <line x1="13" y1="6" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </form>
  )
}

export default LoginForm