import React from "react"

import type { UserInputProps } from "~types"

const UserInput = ({ value, onChange, placeholder }: UserInputProps) => {
  return (
    <input
      className="border-solid border-[1px] border-slate-400 p-4 rounded-md"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default UserInput
