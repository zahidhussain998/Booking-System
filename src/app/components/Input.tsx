import { UUID } from 'crypto'
import React from 'react'


type InputType = {

  value:string,
  onChange: React.ChangeEvent<HTMLInputElement>,
  
   name:string,
  type:string,
}

  function Input(inputType:InputType){
  return (
    <div>
      <input onChange={inputType.onChange} value={inputType.value} type={inputType.type} name={inputType.name} id=""/>


    </div>
  )
}

export default Input