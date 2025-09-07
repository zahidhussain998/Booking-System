import React from 'react'

type enummiro = {
  className:string,
  
  

}
function Input({
  className
    onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void
    ...props
    value
  }
){
  return (
    <div>
      <input onChange={onChange} value={value} type="text" name="" id="" className={`flex justify-between items-center ${className}`}{...props}/>


    </div>
  )
}

export default Input