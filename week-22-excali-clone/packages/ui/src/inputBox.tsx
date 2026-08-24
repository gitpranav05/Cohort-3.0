import React from 'react'

export default function inputBox({
  text,
  placeholder,
}: {
  text: string;
  placeholder: string;
}) {
  return (
    <div>
      <input className=" outline-0" type={text} placeholder={placeholder} />
    </div>
  );
}

