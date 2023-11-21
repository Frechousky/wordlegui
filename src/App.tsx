import Game from './components/Game/Game'
import { WORD_LENGTHS } from './constants'
import { loadGame, loadSettings } from './persistence'
import { getTodayYYYYMMDD } from './utils'

function App () {
  return (
    <>
      <Game
        initData={loadGame(WORD_LENGTHS[0], getTodayYYYYMMDD())}
        settings={loadSettings()}
      />
    </>
  )
}

export default App
