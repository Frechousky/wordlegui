import { KEYBOARDS } from '../../constants'
import { Settings } from '../../persistence'

export type GameSettingsFormProps = {
  settings: Settings
  setSettings: (arg0: Settings) => void
}

function GameSettingsForm ({ settings, setSettings }: GameSettingsFormProps) {
  const onKeyboardChange = (e: any) => {
    e.target.blur()
    const newSettings = { ...settings }
    newSettings.keyboard = KEYBOARDS[Number(e.target.value)]
    setSettings(newSettings)
  }
  const keyboardOptions = KEYBOARDS.map((value, index) => {
    return (
      <option value={index} key={index}>
        {value.name}
      </option>
    )
  })
  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor='keyboard'>Clavier</label>
      &nbsp;
      <select
        id='keyboard'
        value={KEYBOARDS.indexOf(settings.keyboard)}
        onChange={onKeyboardChange}
      >
        {keyboardOptions}
      </select>
    </div>
  )
}

export default GameSettingsForm
