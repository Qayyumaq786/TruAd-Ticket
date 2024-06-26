import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
// import ChatBox from './ChatBox';
export default function Page() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    if (!cookies.user) {
      navigate("/adminpanel/");
    }
    // removeCookie("user", {path:'/'})
  }, [cookies]);

  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideBar removeCookie={removeCookie} navigate={navigate} />
      </Grid>
      <Grid item xs={10} sx={{ height: "100vh", overflowY: "auto" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
