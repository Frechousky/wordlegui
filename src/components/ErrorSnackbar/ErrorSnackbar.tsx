import { Alert, Snackbar } from '@mui/material'

export type ErrorSnackbarProps = {
  message: string
  open: boolean
  onClose: () => void
}

function ErrorSnackbar ({ message, open, onClose }: ErrorSnackbarProps) {
  return (
    <Snackbar
      open={open}
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
