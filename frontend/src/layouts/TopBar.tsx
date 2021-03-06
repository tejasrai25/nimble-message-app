import * as React from 'react';
import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { User } from '../models';
import { logout } from '../auth';

// app bar at the top of the page
const TopBar = ({ user }: { user: null | User }): JSX.Element => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    return (
        <AppBar position="static">
            <Toolbar >
                <Tooltip title="Open settings">
                    <IconButton
                        onClick={handleOpenUserMenu} sx={{ p: 0 }}

                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Avatar>{user?.name[0]}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem
                        onClick={() => {
                            logout();
                            handleCloseUserMenu();
                        }}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    {user?.name}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;