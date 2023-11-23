import { Alert, Snackbar } from '@mui/material'

export type ErrorSnackbarProps = {
  message: string
  onClose: () => void
}

function ErrorSnackbar ({ message, onClose }: ErrorSnackbarProps) {
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

export default ErrorSnackbar
