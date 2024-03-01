export interface ModalContentProps {
  showMessageBox: boolean
  texts: string[]
  generatedMessage: string
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  hanldeGenerate: () => void
  handleInsert: () => void
}
