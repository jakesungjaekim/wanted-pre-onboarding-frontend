import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import TodoForm from './components/TodoForm';


const Todo = () => {
  const navigate = useNavigate();
  const TOKEN = localStorage.getItem('TOKEN');

  useEffect(() => {
    if(!TOKEN) {
      navigate('/signin')  
    } else { 
      navigate('/todo')
    }},[]);

  return (
    <TodoForm />
  )
}

export default Todo