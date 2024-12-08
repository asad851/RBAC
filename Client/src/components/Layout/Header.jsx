import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import {
  MailOutlineOutlined,
  MenuOpenRounded,
  NotificationsOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../routes/route_names";
import { toggleSideBar } from "../../store/layout/layout";
function Header() {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const [greeting, setGreeting] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { user } = useSelector((state) => state.auth);
  
  const currentTimeArr = dayjs().format("hh:mm A").split(" ");
  const amOrPm = currentTimeArr[1];
  const current = currentTimeArr[0].split(":")[0];
  useEffect(() => {
    if (amOrPm === "AM") {
      setGreeting("Good Morning");
    } else {
      if (amOrPm === "PM") {
        if (current === "12" || current < 5) {
          setGreeting("Good Afternoon");
        } else if (current >= 5) {
          setGreeting("Good Evening");
        }
      }
    }
  }, [amOrPm]);
  const upperCasedName = user?.name?.toUpperCase();
  const settings = [
    { name: "Profile", action: () => {}, id: 12 },
    {
      id: 13,
      name: "Logout",
      action: () => {
        Cookies.remove("token");
        navigate(LOGIN_PATH);
        localStorage.clear();
      },
    },
  ];
  return (
    <header className="h-20 fixed z-[500]  right-0  w-full top-0 box-border px-5 py-5 flex justify-between items-center border-b-2 bg-white border-gray-200">
      <div className="mr-4 bg-gray-200 rounded-md p-2">
      <Typography textTransform={"capitalize"} variant="h5">
          RBAC
        </Typography>
      </div>
      <div className="w-full flex gap-2 items-center text-xl max-[900px]:hidden text-[#502c65]">
        <Typography variant="body1medium">{greeting}, </Typography>
        <Typography textTransform={"capitalize"} variant="h5">
          {"  "}
          {user.name}{" "}
        </Typography>
      </div>
      <div className="w-full flex gap-2 items-center text-xl min-[900px]:hidden text-[#502c65]">
        <MenuOpenRounded onClick={()=>dispatch(toggleSideBar())} className="cursor-pointer" fontSize="large" />
      </div>
      <div className="flex gap-4 items-center">
        <MailOutlineOutlined className="cursor-pointer" />
        <NotificationsOutlined className="cursor-pointer" />
        <div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  variant="rounded"
                  alt={upperCasedName}
                  src="/static/images/avatar/2.jpg"
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    handleCloseUserMenu();
                    setting.action();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
