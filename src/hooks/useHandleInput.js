import { useState } from 'react'

export default function useHandleInput (initialValue) {
  const [values, setValues] = useState(initialValue)
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }
  const clearInputValues = () => {
    setValues(initialValue);
  };

  return [values, handleInput, clearInputValues]
} 