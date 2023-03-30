import React, {useState, useEffect} from 'react'
import { API } from '../../../config'
import axios from 'axios'



const TodoForm = () => {
  const access_token = localStorage.getItem('TOKEN')
  const [todoList, setTodoList] = useState([])
  const [todo, setTodo] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [isShowTodoId, setIsShowTodoId] = useState(null)
  

  const handleShowTodo = (targetId) => {
    setIsShowTodoId(targetId === isShowTodoId ? null : targetId)

    const targetTodo = todoList.find(todo => todo.id === targetId);
      if (targetTodo) {
        setNewTodo(targetTodo.todo);
      }
  };
  

  const handleInput = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(todoList)
    axios.post(API.TODO, {
      todo: todo
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/json'
      },
    })
    .then((response) => {
      console.log(response.data)
      setTodoList([...todoList, response.data])
      setTodo('')
      })
      .catch((error) => {
        console.log(error)
        }
    )
  }

  const handleDelete = (deletedId) => {
    axios.delete(`${API.TODO}/${deletedId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
    })
    .then(() => {
      setTodoList(todoList.filter((todo) => todo.id !== deletedId))
    })
    .catch((error) => {
      console.log(error)
    }
    )
  }

  const handleComplete = (completedTodo) => {
    console.log(completedTodo.id)
    
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === completedTodo.id) {

        todo.isCompleted = !completedTodo.isCompleted
        
        axios.put(`${API.TODO}/${completedTodo.id}`,
           {
            todo: todo.todo,
            isCompleted: todo.isCompleted
           },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-type': 'application/json',
            },
          }
        )
      }
      return todo
    })
    setTodoList(updatedTodoList)
  }

  const handleEdit = (targetId, newTodo) => {
    console.log('handleEdit 함수작동중')
    axios.put(`${API.TODO}/${targetId}`, {
      todo: newTodo,
      isCompleted: false,

    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/json'
      },
    })
    .then((response) => {
      console.log(response.data)
      const updatedTodoList = todoList.map((todo) => {
        if (todo.id === targetId) {
          return {
            ...todo,
            todo: newTodo,
          }
        }
        return todo
      })
      setTodoList(updatedTodoList)
      setNewTodo('')
      setIsShowTodoId(null);
    })
    .catch((error) => {
      console.log(error)
    })
  }
  useEffect(()=>{
    axios.get(API.TODO, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    .then((response) => {
      console.log(response.data)
      setTodoList(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  },[access_token])

  return (
    <section id="todo" className='h-screen bg-rose-50'>
      <div className='container flex flex-col items-center justify-center mx-auto'>
        <h1 className='p-6 mb-10 text-4xl font-bold text-center text-amber-600'>Todo List</h1>
        <form onSubmit={handleAdd} className='flex items-center justify-center w-full mb-10 space-x-4'>
          <input data-testid="new-todo-input" type="text" value={todo} onChange={handleInput} placeholder='Enter Your Todo' className='w-1/2 p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
          <button data-testid="new-todo-add-button" type='submit' className='w-1/12 p-6 text-white rounded-md bg-amber-600'>Add Todo</button>
        </form>
        <ul className='w-1/2 space-y-4'>
          {todoList.map((todo) => {
            return (
            <div className='flex flex-col items-center justify-center w-full' key={todo.id}>
              {
                isShowTodoId === todo.id 
                ? 
                (
                  <li className='flex items-center justify-between w-full text-xl font-base text-slate-600'>
                  <input type="checkbox" checked={todo.isCompleted} onChange={() => handleComplete(todo)}/>
                  <span>
                    <input data-testid="modify-input" type="text" value={newTodo} placeholder='수정하세요~' onChange={(e) => setNewTodo(e.target.value)} />
                  </span>
                  <div>
                    <button data-testid="submit-button" className='p-2 ml-4 text-blue-700 border rounded-lg border-slate-700' onClick={() => handleEdit(todo.id, newTodo)}>제출</button>
                    <button data-testid="cancel-button" onClick={()=>handleShowTodo(todo.id)} className='p-2 ml-4 text-red-700 border rounded-lg border-slate-700'>취소</button>
                  </div>
              </li>
                )
                :
                (
                  <li className='flex items-center justify-between w-full text-xl font-base text-slate-600'>
                      <input type="checkbox" checked={todo.isCompleted} onChange={() => handleComplete(todo)}/>
                      <span>
                        {todo.todo}
                      </span>
                      <div>
                        <button className='p-2 ml-4 text-blue-700 border rounded-lg border-slate-700' onClick={()=>handleShowTodo(todo.id)}>수정</button>
                        <button data-testid="delete-button" onClick={() => handleDelete(todo.id)} className='p-2 ml-4 text-red-700 border rounded-lg border-slate-700'>삭제</button>
                      </div>
                  </li>
                )
              }
            </div>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default TodoForm