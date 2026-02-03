import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
]


const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': { color: 'grey.500' },
  '&.active': { color: '#baecf9' }
}

export default function NavBar() {
  const {isLoading, darkMode} = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Box display="flex" alignItems="center" >
          <Typography variant="h6" component={NavLink} sx={navStyles} to="/" >RE-STORE </Typography>
          <IconButton onClick={() => dispatch(setDarkMode())} sx={{ ml: 1 }}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
          </IconButton>
        </Box>

        <List sx={{ display: 'flex', direction: 'row' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              key={path}
              to={path}
              sx={navStyles}
            >{title.toUpperCase()}</ListItem>))}

        </List>

        <Box display='flex'>
          <IconButton>
            <Badge badgeContent={4} color="secondary" >
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                key={path}
                to={path}
                sx={navStyles}
              >{title.toUpperCase()}</ListItem>))}

          </List>
        </Box>
      </Toolbar>
              {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress sx={{ color: 'secondary' }} />
        </Box>
              )}
    </AppBar>
  )
}