import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, MenuItem, ListItemIcon, IconButton, Divider } from '@mui/material';
import { checkLogged, refreshAccessToken, signout } from '../service/ApiService'
import { Login, Edit, User, UserThin, Document, Logout } from '../assets/icons'

const AppHeaderTool = () => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();

  const [logged, setLogged] = useState();
  useEffect(() => {
    const check = checkLogged();
    console.log(`############ check : ${check}`);
    if (accessToken && accessToken != null) {
      if (check === false) {
        refreshAccessToken(navigate);
      }
      setLogged(check);
    }
  },[accessToken, navigate])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => { setAnchorEl(e.currentTarget); }
  const handleClose = (e) => { setAnchorEl(null); }
  const handleSignout = (e) => { signout(navigate); }

  const MenuPop = () => {
    return (
      <Menu anchorEl={anchorEl} id='account-menu' open={open} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right', }} sx={{ mt: '35px' }}>
        <MenuItem component={Link} to='/userinfo'>
          <ListItemIcon><UserThin /></ListItemIcon>회원정보
        </MenuItem>
        <MenuItem component={Link} to='/userarticle'>
          <ListItemIcon><Document /></ListItemIcon>작성 게시물
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignout}>
          <ListItemIcon><Logout /></ListItemIcon>로그아웃
        </MenuItem>
      </Menu>
    )
  }

  if (accessToken && accessToken !== null && logged) {
    return (
      <div className='flex flex-row gap-[20px]'>
        <p className="flex w-[20px] h-[20px] ">
          <a href="/editor"><Edit /></a>
        </p>
        <p className="flex w-[20px] h-[20px]">
          <IconButton onClick={handleClick} aria-controls={open ? 'account-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}>
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
          <a href="/login"><Login /></a>
        </p>
      </div>
    )
  }
}

export default AppHeaderTool
