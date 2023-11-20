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
import { GameStatus, loadGame, loadSettings } from '../../persistence'
import GameGrid from '../GameGrid/GameGrid'
import GameKeyboard from '../GameKeyboard/GameKeyboard'
import GameSettingsForm from '../GameSettingsForm/GameSettingsForm'
import Header from '../Header/Header'
import ErrorPanel from '../ErrorPanel/ErrorPanel'
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme
} from '@mui/material'
import createPalette, {
  PaletteOptions
} from '@mui/material/styles/createPalette'

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
  const [displayGameSettingsForm, setDisplayGameSettingsForm] = useState(false)
  const [error, setError] = useState('')
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

  function displayError (message: string) {
    shakeAnimation.play()
    setError(message)
  }

  function addCharacter (key: string) {
    if (data.status !== GameStatus.IN_PROGRESS) {
      return
    }
    if (
      /^[a-zA-Z]$/.test(key) &&
      data.currentAttempt.length < data.wordLength
    ) {
      dispatch(buildAddCharacterAction(key.toUpperCase()))
    }
  }

  function removeLastCharacter () {
    if (data.status !== GameStatus.IN_PROGRESS) {
      return
    }
    dispatch(buildRemoveCharacterAction())
  }

  function submitPlayerAttempt () {
    if (data.status !== GameStatus.IN_PROGRESS) {
      return
    }
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
    content = (
      <>
        <Box>
          <FormControl>
            <InputLabel id='word-length-select-label'>
              Longueur de mot
            </InputLabel>
            <Select
              labelId='word-length-select-label'
              id='word-length-select'
              value={data.wordLength}
              label='Longueur de mot'
              onChange={onWordLengthChange}
              fullWidth={true}
            >
              {WORD_LENGTHS.map((wordLength, index) => {
                return (
                  <MenuItem key={index} value={wordLength}>
                    {wordLength}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <GameGrid
            words={words}
            statuses={data.prevAttemptsPositionStatuses}
          />
        </Box>
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
      </>
    )
  }
  const paletteOptions: PaletteOptions = {
    mode: 'light'
    // primary: {
    //   main: '#DF9900'
    // },

    // secondary: {
    //   main: '#113397'
    // },

    // success: {
    //   main: '#62D62C'
    // },

    // info: {
    //   main: '#008CFF'
    // },

    // warning: {
    //   main: '#F9E109'
    // },

    // error: {
    //   main: '#FF4750'
    // }
  }
  const palette = createPalette(paletteOptions)
  const theme = createTheme({ palette: palette })
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ textAlign: 'center' }}>
        <Header title='Wordle' />
        {error && (
          <ErrorPanel
            message={error}
            onClose={() => {
              setError('')
            }}
          />
        )}
        {content}
      </Container>
    </ThemeProvider>
  )
}

export default Game
