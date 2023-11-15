import Game from './components/Game/Game'
import { WORD_LENGTHS } from './constants'
import { getTodayYYYYMMDD } from './utils'

function App () {
  return (
    <>
      <Game wordLength={WORD_LENGTHS[0]} dateMMMMYYDD={getTodayYYYYMMDD()} />
    </>
  )
}

export default App
