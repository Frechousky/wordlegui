export type ErrorPanelProps = {
  message: string
}

function ErrorPanel ({ message }: ErrorPanelProps) {
  return <div style={{ minHeight: '50px', textAlign: 'center' }}>{message}</div>
}

export default ErrorPanel
