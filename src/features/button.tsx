import type { ButtonProps } from "~types"

const Button = ({ icon, text, primary, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex p-3 ${primary ? "bg-[#3B82F6]" : "bg-white border-[2px] border-solid border-[#666d80]"} w-[fit] rounded-md`}>
      <div className="flex justify-center items-center">
        <img className="h-6 w-6 mr-2" src={icon} alt="button-icon" />
        <span
          className={`${
            primary ? "text-white" : "text-[#666D80]"
          } ${"font-semibold text-2xl"}`}>
          {text}
        </span>
      </div>
    </button>
  )
}

export default Button
