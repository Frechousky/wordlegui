import { Box, Container } from '@mui/material'
import { VALUE_BACK_SPACE, VALUE_RETURN } from 'keycode-js'
import { useEffect, useReducer, useState } from 'react'
import {
  WordleApiErrorCode,
  WordleApiResponse,
  postPlayerAttempt
} from '../../clients/wordleapi'
import { ALPHABET_LETTER_REGEX, CharacterStatus } from '../../constants'
import gameReducer, {
  buildAddAttemptAction,
  buildAddCharacterAction,
  buildRemoveCharacterAction
} from '../../hooks/gameReducer'
import { GameData, GameStatus, Settings } from '../../persistence'
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar'
import GameGrid from '../GameGrid/GameGrid'
import GameKeyboard from '../GameKeyboard/GameKeyboard'
import Header from '../Header/Header'

const ERROR_ALERT_AUTOHIDE_DURATION = 5000

type Error = {
  message: string
  hideErrorTimeoutId: ReturnType<typeof setTimeout> | undefined
}

type GameProps = {
  initData: GameData
  settings: Settings
}

function Game ({ initData, settings }: GameProps) {
  const [data, dispatch] = useReducer(gameReducer, initData)

  const [error, setError] = useState({
    message: '',
    hideErrorTimeoutId: undefined
  } as Error)

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      // remove event handler on re-render otherwise they add up
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  const shakeAnimation =
    window.Animation && window.KeyframeEffect
      ? new Animation(
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
      : undefined

  function handleErrorHide () {
    if (error.hideErrorTimeoutId) {
      clearTimeout(error.hideErrorTimeoutId)
    }
    if (error.message) {
      setError({
        message: '',
        hideErrorTimeoutId: undefined
      })
    }
  }

  function handleBackspaceKeydown () {
    if (data.status !== GameStatus.IN_PROGRESS) {
      return
    }
    dispatch(buildRemoveCharacterAction())
  }

  function handleError (message: string) {
    if (shakeAnimation) {
      shakeAnimation.play()
    }
    if (error.hideErrorTimeoutId) {
      // clear previous timeout
      // this makes sure error message is displayed the right amount of time
      // and not unset by calling handleAlertClose prematurely
      clearTimeout(error.hideErrorTimeoutId)
    }
    const tid = setTimeout(handleErrorHide, ERROR_ALERT_AUTOHIDE_DURATION) // hide error alert after duration
    setError({
      message: message,
      hideErrorTimeoutId: tid
    })
  }

  function handleKeydown (e: KeyboardEvent) {
    if (e.key === VALUE_RETURN) {
      handleReturnKeydown()
    } else if (e.key === VALUE_BACK_SPACE) {
      handleBackspaceKeydown()
    } else {
      handleLetterKeydown(e.key)
    }
  }

  function handleLetterKeydown (key: string) {
    if (data.status !== GameStatus.IN_PROGRESS) {
      return
    }
    if (
      ALPHABET_LETTER_REGEX.test(key) &&
      data.currentAttempt.length < data.wordLength
    ) {
      dispatch(buildAddCharacterAction(key.toUpperCase()))
    }
  }

  function handleReturnKeydown () {
    if (data.status !== GameStatus.IN_PROGRESS) {
      return
    }
    if (data.currentAttempt.length < data.wordLength) {
      handleError(`Veuillez entrer un mot de ${data.wordLength} lettres`)
      return
    }
    async function onfullfilled (resp: Response) {
      const json = (await resp.json()) as WordleApiResponse
      if (!resp.ok) {
        // handle API errors
        if (json.code === WordleApiErrorCode.GUESS_NOT_IN_WHITELIST) {
          handleError(
            `'${data.currentAttempt.toUpperCase()}' n'est pas dans la liste de mots`
          )
        }
        return
      }
      if (json.success === true) {
        // player win
        dispatch(
          buildAddAttemptAction(
            data.currentAttempt,
            Array(data.wordLength).fill(CharacterStatus.GOOD_POSITION)
          )
        )
      } else if (json.result !== undefined) {
        // add attempt result
        dispatch(buildAddAttemptAction(data.currentAttempt, json.result))
      }
    }
    function onrejected (reason: any) {
      handleError(
        "Le jeu n'est pas jouable à cause d'un problème technique. Veuillez réessayer ultérieurement."
      )
    }
    postPlayerAttempt(data.currentAttempt, data.wordLength).then(
      onfullfilled,
      onrejected
    )
  }

  return (
    <Container sx={{ textAlign: 'center' }} id='game'>
      <Header />
      <ErrorSnackbar
        message={error.message}
        open={error.message.length > 0}
        onClose={handleErrorHide}
      />
      <Box sx={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <GameGrid
          words={[...data.previousAttempts, data.currentAttempt]}
          statuses={data.prevAttemptsPositionStatuses}
          wordLength={data.wordLength}
          maxAttempts={data.maxAttempts}
        />
      </Box>
      <GameKeyboard
        keyboard={settings.keyboard}
        handleOnCharacterClickWrapper={key => {
          return e => {
            handleLetterKeydown(key)
          }
        }}
        handleOnBackspaceClick={handleBackspaceKeydown}
        handleOnReturnClick={handleReturnKeydown}
      />
    </Container>
  )
}

export default Game
