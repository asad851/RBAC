import React, { useState, useEffect } from "react";
import { IconButton, List, ListItem, Tooltip, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AddCardOutlined,
  CampaignOutlined,
  CloseRounded,
  GridViewOutlined,
  NotificationsOutlined,
  PeopleAltOutlined,
  SettingsOutlined,
  SwitchAccountOutlined,
  TextSnippetOutlined,
} from "@mui/icons-material";
import {
  ADMIN_ANNOUNCEMENTS,
  ADMIN_DASHBOARD,
  USER_ANNOUNCEMENTS,
} from "../../routes/route_names";
import dayjs from "dayjs";
import { toggleSideBar } from "../../store/layout/layout";

const SidebarHeader = () => {
  const [greeting, setGreeting] = useState("");
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

  return (
    <div
      className={`w-full pt-4 flex items-center justify-center pb-3 min-[900px]:hidden `}
    >
      <div className="w-full flex gap-2 items-center  text-[#502c65]">
        <Typography variant="body2medium">{greeting}, </Typography>
        <Typography textTransform={"capitalize"} variant="body1medium">
          {"  "}
          {user.name}{" "}
        </Typography>
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon: Icon,
  text,
  collapsed,
  fontSize,
  pathname,
  path,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Tooltip placement="right" arrow title={text}>
      <ListItem
        key={text}
        onClick={() => {
          navigate(path);
          dispatch(toggleSideBar());
        }}
        className={` cursor-pointer flex   gap-2 py-[16px!important] 
         hover:bg-white  rounded-full text-gray-600  ${
           pathname.includes(path) && "bg-white "
         }`}
      >
        <Icon fontSize={fontSize} />

        {!collapsed && <Typography variant="body4bold">{text}</Typography>}
      </ListItem>
    </Tooltip>
  );
};

function SideNav() {
  const location = window.location.pathname;
  const dispatch = useDispatch();
  const { sideBar } = useSelector((state) => state.layout);
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      variant="permanent"
      className={`   flex justify-end w-[350px] max-[900px]:w-[300px]  duration-500 ease-in-out h-full  box-border max-[900px]:absolute top-0  max-[900px]:z-[600] ${
        sideBar ? "left-0" : "-left-96"
      }  `}
    >
      <div className="bg-[#f4f2f7] h-full w-full p-5  flex flex-col justify-between drop-shadow-md relative">
        <IconButton
          onClick={() => dispatch(toggleSideBar())}
          className="min-[900px]:[display:none!important]"
          sx={{
            position: "absolute",
            top: "5px",
            right: "10px",
          }}
        >
          <CloseRounded />
        </IconButton>
        <div>
          <SidebarHeader />
          <div className="w-full    oveflow-y-auto">
            {/* Sidebar Items */}

            <List
              sx={{
                mt: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {user.role === "admin" ? (
                <>
                  <SidebarItem
                    icon={GridViewOutlined}
                    text="Dashboard"
                    pathname={location}
                    path={ADMIN_DASHBOARD}
                  />
                  <SidebarItem
                    icon={CampaignOutlined}
                    text="Announcements"
                    pathname={location}
                    path={ADMIN_ANNOUNCEMENTS}
                  />
                </>
              ) : (
                <>
                  <SidebarItem
                    icon={CampaignOutlined}
                    text="Announcements"
                    pathname={location}
                    path={USER_ANNOUNCEMENTS}
                  />
                </>
              )}

              {/* Add more SidebarItems here */}
            </List>
          </div>
        </div>
        {/* <SidebarFooter collapsed={collapsed} /> */}
      </div>
    </div>
  );
}

export default React.memo(SideNav);
