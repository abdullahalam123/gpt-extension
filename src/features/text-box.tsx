import type { TextBoxProps } from "~types"

const TextBox = ({ text, generated }: TextBoxProps) => {
  return (
    <div
      className={`p-4 mb-4 flex w-[350px] rounded-md  ${generated ? "bg-[#DBEAFE]" : " bg-gray-200 ml-auto"} `}>
      <div className="text-gray-500">{text}</div>
    </div>
  )
}

export default TextBox
