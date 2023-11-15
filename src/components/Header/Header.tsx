export type HeaderProps = {
  title: string
}

function Header ({ title }: HeaderProps) {
  return (
    <header>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
    </header>
  )
}

export default Header
