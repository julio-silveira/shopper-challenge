import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CustomDrawer from './components/Drawer';
import { useTheme } from '@mui/material';
import logo from '@/assets/logo.svg'




const navItems = ['Produtos'];

export default function NavBar() {
  const theme =useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{bgcolor: "white" , color:"black" }} component="nav">
        <Box sx={{bgcolor: theme.palette.primary.main, minHeight: '5px' }}/>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box mr={4} component="img" src={logo}   sx={{  display: { xs: 'none', sm: 'block' }, width: '150px' }}/>


          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
            <CustomDrawer
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              navItems={navItems} />
      </Box>

    </Box>
  );
}
