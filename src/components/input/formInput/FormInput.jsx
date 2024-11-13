import React from 'react'


export default function FormInput({type, placeholder, name, id, width, onChange,onBlur, value, checked , errors, register, label, validate, pattern, required}) {

  
  return (
    <input  {...register(label, { required, validate, pattern})}  checked={checked}  className={` bg-color-2 rounded-xl p-2 border ${ width ? width: "w-full" }  border-color-1 shadow-md outline-none text-color-1  ${errors && "border-red-500"}`} type={type} name={name} id={id}  placeholder={placeholder} />

  )
}
 