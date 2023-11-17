import { AppBar, Box, Toolbar, Typography } from '@mui/material'

export type HeaderProps = {
  title: string
}

function Header ({ title }: HeaderProps) {
  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            align='center'
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
