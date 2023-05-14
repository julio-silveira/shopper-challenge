import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText, Drawer } from '@mui/material'

type Props = {
  mobileOpen: boolean
  handleDrawerToggle: () => void
  navItems: string[]
  window?: () => Window;
}

const drawerWidth = 240;

export default function CustomDrawer({handleDrawerToggle, navItems, window, mobileOpen }: Props) {

  const container = window !== undefined ? () => window().document.body : undefined;

 return(
  <Drawer
  container={container}
  variant="temporary"
  open={mobileOpen}
  onClose={handleDrawerToggle}
  ModalProps={{
    keepMounted: true,
  }}
  sx={{
    display: { xs: 'block', sm: 'none' },
    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
  }}
>
<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography color="primary" variant="h6" sx={{ my: 2 }}>
        Shopper
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
</Drawer>
  
    )
}