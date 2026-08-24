import React from 'react'

function inputBox({text, placeholder}:{
    text:string, placeholder:string
}) {
  return (
    <div>
        <input type={text} placeholder={placeholder} />
    </div>
  )
}

export default inputBox