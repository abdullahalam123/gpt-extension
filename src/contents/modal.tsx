import InsertIcon from "data-base64:~assets/download.svg"
import GenerateIcon from "data-base64:~assets/plane.svg"
import RegenerateIcon from "data-base64:~assets/restore.svg"
import cssText from "data-text:~style.css"
import type { PlasmoGetOverlayAnchor, PlasmoGetShadowHostId } from "plasmo"
import React, { useEffect, useRef, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import Button from "~features/button"
import TextBox from "~features/text-box"
import Input from "~features/user-input"
import type { ModalContentProps } from "~types/modal-content"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector(".msg-form__contenteditable")

export const getShadowHostId: PlasmoGetShadowHostId = () =>
  "msg-form__contenteditable-overlay"

const ModalContent = ({
  showMessageBox,
  texts,
  generatedMessage,
  text,
  setText,
  hanldeGenerate,
  handleInsert
}: ModalContentProps) => (
  <div className="p-6 w-[550px] h-auto rounded-md shadow-md flex flex-col">
    {showMessageBox ? (
      <div className="h-auto w-full flex flex-col mb-4">
        <TextBox text={texts[0]} />
        <TextBox text={generatedMessage} generated />
      </div>
    ) : null}
    <Input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Your Prompt"
    />
    <div className="mt-6 ml-auto">
      {showMessageBox ? (
        <div className="flex gap-6">
          <Button onClick={handleInsert} icon={InsertIcon} text="Insert" />
          <Button icon={RegenerateIcon} text="Regenerate" primary />
        </div>
      ) : (
        <Button
          onClick={hanldeGenerate}
          icon={GenerateIcon}
          text="Generate"
          primary
        />
      )}
    </div>
  </div>
)

const Modal = () => {
  const [text, setText] = useState("")
  const [showMessageBox, setShowMessageBox] = useState(false)
  const [texts, setTexts] = useState([])

  const modalRef = useRef<HTMLDivElement | null>(null)

  const [showModal, setShowModal] = useStorage({
    key: "showModal",
    instance: new Storage({ area: "local" })
  })

  const deafaultMessage =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."

  const hanldeGenerate = () => {
    const trimmedText = text.trim()

    if (trimmedText !== "") {
      setShowMessageBox(true)
      setTexts((prevTexts) => [...prevTexts, trimmedText])
      setText("")
    }
  }

  const resetValues = () => {
    setShowMessageBox(false)
    setTexts([])
    setText("")
    setShowModal(false)
  }

  const handleInsert = () => {
    const messageForm: HTMLElement = document
      .querySelector(".msg-form__contenteditable")
      ?.querySelector("p")
    const messagePlaceholder: HTMLElement = document.querySelector(
      ".msg-form__placeholder"
    )
    messagePlaceholder?.classList?.remove("msg-form__placeholder")
    messageForm.innerHTML = deafaultMessage
    resetValues()
  }

  useEffect(() => {
    const showModal = JSON.parse(sessionStorage.getItem("showModal")) || false
    setShowModal(showModal)
  }, [])

  useEffect(() => {
    modalRef?.current?.addEventListener("click", () => {
      resetValues()
    })
  }, [showModal])

  return (
    <>
      {showModal ? (
        <div className="absolute text-xl">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black opacity-50 transition-opacity"
              ref={modalRef}></div>
            <div className="z-50 bg-white rounded-2xl shadow-md">
              <ModalContent
                showMessageBox={showMessageBox}
                texts={texts}
                generatedMessage={deafaultMessage}
                text={text}
                setText={setText}
                hanldeGenerate={hanldeGenerate}
                handleInsert={handleInsert}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal
