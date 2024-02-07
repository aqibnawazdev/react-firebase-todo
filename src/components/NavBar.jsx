import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Logout } from "@mui/icons-material";

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState();
  const [role, setRole] = useState("user");

  const getClaim = () => {
    auth.currentUser
      .getIdTokenResult()
      .then((idTokenResult) => {
        // console.log(idTokenResult.claims);
        setRole(idTokenResult.claims.claim);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getClaim();
        const uid = user.uid;
        // console.log(user);
        setUser(user);
      } else {
        setUser(false);
      }
    });
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setAnchorElNav(null);
        setUser(false);
        navigate("/login");
      })
      .catch((error) => {});
  };
  return (
    <AppBar position="fixed" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NoteAltIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link className="link" to="/">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <NoteAltIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Todo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link className="link" to="/">
              <Typography color={"white"}>Home</Typography>
            </Link>
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography variant="body2" color="white" mr={2}>
                    Hi, {role}
                  </Typography>
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.providerData[0]?.photoURL || ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link className="link" to="/">
                    <Typography textAlign="center">Home</Typography>
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Link className="link" to="/profile">
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                {role === "admin" && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link className="link" to="/manageusers">
                      <Typography textAlign="center">Manage Users </Typography>
                    </Link>
                  </MenuItem>
                )}

                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">
                    <Logout size="small" /> Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <Link className="link" to="/login">
                <Button
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    marginRight: "4px",
                  }}
                >
                  Login
                </Button>
              </Link>

              <Link className="link" to="/register">
                <Button sx={{ color: "white", border: "1px solid white" }}>
                  Register
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
