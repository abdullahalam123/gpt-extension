import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetShadowHostId,
  PlasmoMountShadowHost
} from "plasmo"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import IconButton from "~features/icon-button"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(".msg-form__contenteditable")

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor,
  mountState
}) => {
  anchor.element.appendChild(shadowHost)
  mountState.observer.disconnect()
}

export const getShadowHostId: PlasmoGetShadowHostId = () =>
  "msg-form__contenteditable-inline"

const Icon = () => {
  const [isIconVisible, setIsIconVisible] = useState(true)

  const [showModal, setShowModal] = useStorage({
    key: "showModal",
    instance: new Storage({ area: "local" })
  })

  useEffect(() => {
    const messageForm = document.querySelector(".msg-form__contenteditable")

    const handleFocus = () => {
      setIsIconVisible(true)
    }

    const handleBlur = () => {
      setIsIconVisible(false)
    }

    messageForm.addEventListener("focus", handleFocus)
    messageForm.addEventListener("blur", handleBlur)

    return () => {
      // Cleanup: remove event listeners when the component unmounts
      messageForm.removeEventListener("focus", handleFocus)
      messageForm.removeEventListener("blur", handleBlur)
    }
  }, [])

  const handleClick = () => {
    setShowModal((current: boolean) => !current)
  }

  return (
    <div className="absolute right-0 top-12">
      <IconButton
        isIconVisible={isIconVisible}
        onClick={handleClick}
        showModal={showModal}
      />
    </div>
  )
}

export default Icon
