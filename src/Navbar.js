import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "rc-slider/assets/index.css";

import styles from "./styles/NavbarStyles";

class Navbar extends Component {
   constructor(props) {
      super(props);
      //controlled component like form hence state
      this.state = {
         format: "hex",
         open: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.closeSnackBar = this.closeSnackBar.bind(this);
   }

   handleChange(e) {
      this.setState({
         format: e.target.value,
         open: true
      });
      this.props.handleFormatChange(e.target.value);
   }

   closeSnackBar() {
      this.setState({ open: false });
   }

   render() {
      let { level, handleChange, showSlider, classes } = this.props;
      let { format } = this.state;
      return (
         <header className={classes.Navbar}>
            <div className={classes.logo}>
               <Link to="/">reactcolorpicker</Link>
            </div>
            {showSlider && (
               <div>
                  <span>Level: {level}</span>
                  <div className={classes.slider}>
                     <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={handleChange}
                     />
                  </div>
               </div>
            )}
            <div className={classes.selectContainer}>
               <Select value={format} onChange={this.handleChange}>
                  <MenuItem value="hex">HEX - #ffffff</MenuItem>
                  <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                  <MenuItem value="rgba">
                     RGBA - rgba(255,255,255, 1.0)
                  </MenuItem>
               </Select>
            </div>
            <Snackbar
               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
               open={this.state.open}
               autoHideDuration={3000}
               message={
                  <span id="message-id">
                     Format Changed To {format.toUpperCase()}
                  </span>
               }
               //accessibility
               ContentProps={{
                  "aria-describedby": "message-id"
               }}
               onClose={this.closeSnackBar}
               action={[
                  <IconButton
                     onClick={this.closeSnackBar}
                     color="inherit"
                     key="close"
                     aria-label="close"
                  >
                     <CloseIcon />
                  </IconButton>
               ]}
            />
         </header>
      );
   }
}

export default withStyles(styles)(Navbar);
