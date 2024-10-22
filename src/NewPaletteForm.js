import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";

import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import arrayMove from "array-move";
import seedColors from "./seedColors";
import styles from "./styles/NewPaletteFormStyles";

class NewPaletteForm extends Component {
   static defaultProps = {
      maxColors: 20
   };
   constructor(props) {
      super(props);
      this.state = {
         open: true,
         colors: seedColors[0].colors
      };
      this.addNewColor = this.addNewColor.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColor = this.removeColor.bind(this);
      this.clearColors = this.clearColors.bind(this);
      this.addRandomColor = this.addRandomColor.bind(this);
   }

   handleSubmit(newPalette) {
      newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
      newPalette.colors = this.state.colors;
      this.props.savePalette(newPalette);
      this.props.history.push("/");
   }

   handleDrawerOpen = () => {
      this.setState({ open: true });
   };

   handleDrawerClose = () => {
      this.setState({ open: false });
   };

   updateCurrentColor(newColor) {
      this.setState({ currentColor: newColor.hex });
   }

   addNewColor(newColor) {
      this.setState({
         colors: [...this.state.colors, newColor],
         newColorName: ""
      });
   }

   handleChange(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
   }

   removeColor(colorName) {
      console.log("Removed", colorName);
      this.setState({
         colors: this.state.colors.filter(color => color.name !== colorName)
      });
   }

   clearColors() {
      this.setState({ colors: [] });
   }

   addRandomColor() {
      const allColors = this.props.palettes.map(p => p.colors).flat();
      const filteredArr = allColors.filter(
         color => !this.state.colors.includes(color)
      );
      console.log(filteredArr);
      var rand = Math.floor(Math.random() * filteredArr.length);
      const randomColor = filteredArr[rand];
      this.setState({ colors: [...this.state.colors, randomColor] });
   }

   onSortEnd = ({ oldIndex, newIndex }) => {
      this.setState(({ colors }) => ({
         colors: arrayMove(colors, oldIndex, newIndex)
      }));
   };

   render() {
      const { classes, maxColors, palettes } = this.props;
      const { open, colors } = this.state;
      const paletteIsFull = colors.length >= maxColors;

      return (
         <div className={classes.root}>
            <PaletteFormNav
               open={open}
               palettes={palettes}
               handleSubmit={this.handleSubmit}
               handleDrawerOpen={this.handleDrawerOpen}
            />
            <Drawer
               className={classes.drawer}
               variant="persistent"
               anchor="left"
               open={open}
               classes={{
                  paper: classes.drawerPaper
               }}
            >
               <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                     <ChevronLeftIcon />
                  </IconButton>
               </div>
               <Divider />
               <div className={classes.container}>
                  <Typography variant="h4" gutterBottom>
                     Design Your Palette
                  </Typography>
                  <div className={classes.buttons}>
                     <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.clearColors}
                        className={classes.button}
                     >
                        Clear Palette
                     </Button>
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addRandomColor}
                        disabled={paletteIsFull}
                        className={classes.button}
                     >
                        Random Color
                     </Button>
                  </div>
                  <ColorPickerForm
                     paletteIsFull={paletteIsFull}
                     addNewColor={this.addNewColor}
                     colors={colors}
                  />
               </div>
            </Drawer>
            <main
               className={classNames(classes.content, {
                  [classes.contentShift]: open
               })}
            >
               <div className={classes.drawerHeader} />
               <DraggableColorList
                  colors={colors}
                  removeColor={this.removeColor}
                  axis="xy"
                  onSortEnd={this.onSortEnd}
                  distance={20} //Delete Bug it took it as a drag event
               />
            </main>
         </div>
      );
   }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
