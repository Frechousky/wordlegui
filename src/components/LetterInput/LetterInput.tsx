import { CharacterStatus } from '../../constants'

type LetterInputProps = {
  character: string
  status: CharacterStatus
}

const STATUS_TO_CSS = {
  [CharacterStatus.WELL_PLACED]: 'well-placed',
  [CharacterStatus.MISPLACED]: 'misplaced',
  [CharacterStatus.NOT_PRESENT]: 'not-present',
  [CharacterStatus.UNKNOWN]: 'unknown'
}

function LetterInput ({ character, status }: LetterInputProps) {
  return (
    <input
      type='text'
      value={character}
      readOnly={true}
      className={`letter-input ${STATUS_TO_CSS[status]}`}
      data-status={`${status}`}
      data-testid='letter-input'
    />
  )
}

export default LetterInput
