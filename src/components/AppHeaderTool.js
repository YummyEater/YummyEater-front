import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, MenuItem, ListItemIcon, IconButton, Divider } from '@mui/material';
import { signout } from '../service/ApiService'
import { Login, Edit, User, UserThin, Document, Logout } from '../assets/icons'

const AppHeaderTool = (props) => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => { setAnchorEl(e.currentTarget); }
  const handleClose = (e) => { setAnchorEl(null); }
  const handleSignout = (e) => { signout(navigate); }

  const location = useLocation();
  const handleLogin = (e) => { navigate('/login', {state: location.pathname}) }

  const MenuPop = () => {
    return (
      <Menu anchorEl={anchorEl} id='account-menu' open={open} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right', }} sx={{ mt: '35px' }}>
        <MenuItem disableRipple component={Link} to='/userinfo' onClick={handleClose}>
          <ListItemIcon><UserThin /></ListItemIcon>회원정보
        </MenuItem>
        <MenuItem disableRipple component={Link} to='/userarticle' onClick={handleClose}>
          <ListItemIcon><Document /></ListItemIcon>작성 게시물
        </MenuItem>
        <Divider />
        <MenuItem disableRipple onClick={handleSignout}>
          <ListItemIcon><Logout /></ListItemIcon>로그아웃
        </MenuItem>
      </Menu>
    )
  }

  if (accessToken && accessToken !== null && props.logged) {
    return (
      <div className='flex flex-row gap-[20px]'>
        <p className="flex w-[20px] h-[20px] ">
          <a href="/editor"><Edit /></a>
        </p>
        <p className="flex w-[20px] h-[20px]">
          <IconButton onClick={handleClick} aria-controls={open ? 'account-menu' : undefined}
             disableRipple aria-expanded={open ? 'true' : undefined}>
            <User />
          </IconButton>
          <MenuPop />
        </p>
      </div>
    )
  } else {
    return (
      <div className='d-flex flex-row'>
        <p className="flex w-[20px] h-[20px]">
          <IconButton onClick={handleLogin} disableRipple><Login /></IconButton>
        </p>
      </div>
    )
  }
}

export default AppHeaderTool
