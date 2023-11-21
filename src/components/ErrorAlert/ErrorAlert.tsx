import { Alert, Snackbar } from '@mui/material'

export type ErrorAlertProps = {
  message: string
  onClose: () => void
}

function ErrorAlert ({ message, onClose }: ErrorAlertProps) {
  return (
    <Snackbar
      open={true}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity='error' variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default ErrorAlert
