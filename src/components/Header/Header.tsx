import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { GAME_TITLE } from '../../constants'

function Header () {
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
            {GAME_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
