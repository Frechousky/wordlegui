import { useEffect, useReducer, useState } from 'react'
import {
  WordleApiErrorCode,
  WordleApiResponse,
  postPlayerAttempt
} from '../../clients/wordleapi'
import { CharacterStatus, LETTER_UNKNOWN, WORD_LENGTHS } from '../../constants'
import gameReducer, {
  buildAddAttemptAction,
  buildAddCharacterAction,
  buildRemoveCharacterAction,
  buildUpdateWordLengthAction
} from '../../hooks/gameReducer'
import { loadGame, loadSettings } from '../../persistence'
import GameGrid from '../GameGrid/GameGrid'
import GameKeyboard from '../GameKeyboard/GameKeyboard'
import GameSettingsForm from '../GameSettingsForm/GameSettingsForm'
import Header from '../Header/Header'
import ErrorPanel from '../ErrorPanel/ErrorPanel'

type GameProps = {
  wordLength: number
  dateMMMMYYDD: string
}

const ERROR_DISPLAY_TIME = 3000 // in milliseconds

function Game ({ wordLength, dateMMMMYYDD }: GameProps) {
  const [data, dispatch] = useReducer(
    gameReducer,
    loadGame(wordLength, dateMMMMYYDD)
  )
  const [settings, setSettings] = useState(loadSettings())
  const [displayGameSettingsForm, setDisplayGameSettingsForm] = useState(true)
  const [error, setError] = useState({
    message: '',
    tid: null
  } as {
    message: string
    tid: null | NodeJS.Timeout
  })
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      // remove event handler on re-render otherwise they add up
      document.removeEventListener('keydown', handleKeydown)
    }
  })
  const shakeAnimation = new Animation(
    new KeyframeEffect(
      document.getElementById('game'),
      [
        { transform: 'translateX(1%)' },
        { transform: 'translateX(0)' },
        { transform: 'translateX(-1%)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 120, fill: 'forwards', iterations: 3 }
    ),
    document.timeline
  )

  function displayError (msg: string) {
    shakeAnimation.play()
    if (error.tid) {
      // clear previous timeout to make sure {msg} is displayed {ERROR_DISPLAY_TIME} milliseconds
      clearTimeout(error.tid)
    }
    // remove error message after {ERROR_DISPLAY_TIME} milliseconds
    const tid = setTimeout(
      () => setError({ message: '', tid: null }),
      ERROR_DISPLAY_TIME
    )
    setError({ message: msg, tid: tid })
  }

  function addCharacter (key: string) {
    if (
      /^[a-zA-Z]$/.test(key) &&
      data.currentAttempt.length < data.wordLength
    ) {
      dispatch(buildAddCharacterAction(key.toUpperCase()))
    }
  }

  function removeLastCharacter () {
    dispatch(buildRemoveCharacterAction())
  }

  function submitPlayerAttempt () {
    if (data.currentAttempt.length < data.wordLength) {
      displayError(`Veuillez entrer un mot de ${data.wordLength} lettres`)
      return
    }
    async function onfullfilled (resp: Response) {
      const json = (await resp.json()) as WordleApiResponse
      if (!resp.ok) {
        if (json.code === WordleApiErrorCode.GUESS_NOT_IN_WHITELIST) {
          displayError(
            `'${data.currentAttempt.toUpperCase()}' n'est pas dans la liste de mots`
          )
        }
        return
      }
      if (json.success === true) {
        dispatch(
          buildAddAttemptAction(
            data.currentAttempt,
            Array(data.wordLength).fill(CharacterStatus.GOOD_POSITION)
          )
        )
      } else if (json.result !== undefined) {
        dispatch(buildAddAttemptAction(data.currentAttempt, json.result))
      }
    }
    function onrejected (reason: any) {
      displayError(
        "Le jeu n'est pas actuellement jouable à cause d'un problème technique. Veuillez réessayer ultérieurement."
      )
    }
    postPlayerAttempt(data.currentAttempt, data.wordLength).then(
      onfullfilled,
      onrejected
    )
  }

  function handleKeydown (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      submitPlayerAttempt()
    } else if (e.key === 'Backspace') {
      removeLastCharacter()
    } else {
      addCharacter(e.key)
    }
  }

  function onWordLengthChange (e: any) {
    e.target.blur()
    dispatch(buildUpdateWordLengthAction(Number(e.target.value)))
  }

  const words: string[] = [
    ...data.previousAttempts,
    data.currentAttempt.padEnd(data.wordLength, LETTER_UNKNOWN)
  ]
  while (words.length < data.maxAttempts) {
    words.push(LETTER_UNKNOWN.repeat(data.wordLength))
  }

  let content = null
  if (displayGameSettingsForm) {
    content = <GameSettingsForm settings={settings} setSettings={setSettings} />
  } else {
    const wordLengthsSelectOptions = WORD_LENGTHS.map((wordLength, index) => {
      return (
        <option value={wordLength} key={index}>
          {wordLength}
        </option>
      )
    })
    content = (
      <>
        (
        <div style={{ textAlign: 'center' }}>
          <label htmlFor='wordLength'>Changer la taille du mot à deviner</label>
          &nbsp;
          <select
            id='wordLength'
            onChange={onWordLengthChange}
            value={data.wordLength}
          >
            {wordLengthsSelectOptions}
          </select>
        </div>
        <GameGrid
          maxAttempts={data.maxAttempts}
          wordLength={data.wordLength}
          words={words}
          statuses={data.characterPositionStatuses}
        />
        <GameKeyboard
          keyboard={settings.keyboard}
          handleOnCharacterClickWrapper={key => {
            return e => {
              addCharacter(key)
            }
          }}
          handleOnBackspaceClick={removeLastCharacter}
          handleOnReturnClick={submitPlayerAttempt}
        />
        )
      </>
    )
  }
  return (
    <div id='game'>
      <Header title='Wordle' />
      <ErrorPanel message={error.message} />
      {content}
    </div>
  )
}

export default Game
