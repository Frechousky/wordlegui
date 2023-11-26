import Game from './components/Game/Game'
import { loadGame, loadSettings } from './persistence'
import { getTodayYYYYMMDD } from './utils'

function App () {
  const settings = loadSettings()
  const gameData = loadGame(settings.wordLength, getTodayYYYYMMDD())
  return (
    <>
      <Game initData={gameData} initSettings={settings} />
    </>
  )
}

export default App
