import { Alert, Box } from '@mui/material'

export type ErrorPanelProps = {
  message: string
  onClose: () => void
}

function ErrorPanel ({ message, onClose }: ErrorPanelProps) {
  return (
    <Box>
      <Alert severity='error' onClose={onClose}>
        {message}
      </Alert>
    </Box>
  )
}

export default ErrorPanel
