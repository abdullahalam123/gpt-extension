import Icon from "data-base64:~assets/magic.svg"
import Star from "data-base64:~assets/star.svg"

import type { IconButtonProps } from "~types"

const IconButton = ({ onClick, isIconVisible, showModal }: IconButtonProps) => {
  return (
    <div onClick={onClick} className="hover:cursor-pointer w-12 h-12">
      {isIconVisible && (
        <div
          className={
            !showModal
              ? `w-full h-full rounded-full bg-white shadow-md justify-center items-center flex`
              : `mt-3 ml-3`
          }>
          <img src={showModal ? Star : Icon} alt="button-icon" />
        </div>
      )}
    </div>
  )
}

export default IconButton
