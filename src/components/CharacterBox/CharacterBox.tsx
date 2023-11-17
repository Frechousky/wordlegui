import { Chip } from '@mui/material'
import { CharacterStatus } from '../../constants'

type CharacterBoxProps = {
  character: string
  status: CharacterStatus
}

function CharacterBox ({ character, status }: CharacterBoxProps) {
  return (
    <Chip
      color={
        status === CharacterStatus.GOOD_POSITION
          ? 'success'
          : status === CharacterStatus.BAD_POSITION
          ? 'info'
          : status === CharacterStatus.NOT_PRESENT
          ? 'error'
          : 'secondary'
      }
      sx={{
        minHeight: '50px',
        minWidth: '50px',
        borderRadius: '25px'
      }}
      label={character}
      data-testid='character-box'
      data-status={status}
    ></Chip>
  )
}

export default CharacterBox
