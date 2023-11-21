import { CharacterStatus } from '../../constants'

import './LetterInput.css'

type LetterInputProps = {
  character: string
  status: CharacterStatus
}

function LetterInput ({ character, status }: LetterInputProps) {
  return (
    <input
      type='text'
      value={character}
      readOnly={true}
      className='letter-input'
      data-testid='letter-input'
      data-status={status}
    />
  )
}

export default LetterInput
