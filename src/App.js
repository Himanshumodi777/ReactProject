import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { ApiCall } from "./services/ApiCall";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

export default function SearchAppBar() {
  const [countryName, setCountryName] = useState("");
  const [countryList, setCountryList] = useState([]);

  const [weatherDetails, setWeatherDetails] = useState({});
  const [weatherDetailsFlag, setWeatherDetailsFlag] = useState(false);
  const handleChange = (e) => {
    setCountryName(e.target.value);
  };

  const searchCountryList = async () => {
    //alert("ok")

    const cList = await ApiCall(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (cList) {
      setCountryList(cList);
    }

    console.log(cList);
  };

  const findWeatherDetails = async (Val) => {
    const weatherDetails = await ApiCall(
      `http://api.weatherstack.com/current?access_key=af8ddf121b28102c9c5286780cf24252&query=${Val}`
    );
    if (weatherDetails?.length == 0) {
    } else {
      setWeatherDetails(weatherDetails);
      setWeatherDetailsFlag(true);
      console.log("weather data", weatherDetails);
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Country Details
            </Typography>
            <Search>
              <div onClick={() => searchCountryList()}>
                <small>Search</small>
              </div>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={countryName}
                onChange={(e) => handleChange(e)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      {countryList.length > 0 && (
        <div>
          <table>
            <tr>
              <th>Country Name</th>
              <th>Capital</th>
              <th>Population</th>
              <th>Latitude</th>
              <th>Flag</th>
            </tr>
            {countryList?.map((val) => {
              return (
                <tr onClick={() => findWeatherDetails(val.name.common)}>
                  <td>{val?.name?.common}</td>
                  <td>{val?.capital[0]}</td>
                  <td>{val?.name.common}</td>
                  <td>{val?.population}</td>
                  <td>{val?.latlng[0]}</td>
                  <td>{val?.flag}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
      {weatherDetailsFlag && (
        <div>
          <h3>Weather Details</h3>
          <table>
            <tr>
              <th>City</th>
              <th>Region</th>
              <th>Country</th>
              <th>Time</th>
            </tr>

            <tr>
              <td>{weatherDetails?.request?.query}</td>
              <td>{weatherDetails?.location?.region}</td>
              <td>{weatherDetails?.location?.country}</td>
              <td>{weatherDetails?.location?.localtime}</td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
}
