import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/MiniPaletteStyles";

//PureComponent avoids unnecessary rerendering

class MiniPalette extends PureComponent {
   constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleClick = this.handleClick.bind(this);
   }

   handleDelete(e) {
      e.stopPropagation();
      this.props.openDialog(this.props.id);
   }

   handleClick() {
      this.props.goToPalette(this.props.id);
   }

   render() {
      const { classes, paletteName, emoji, colors } = this.props;
      console.log("RENDERING: ", paletteName);
      const miniColorBoxes = colors.map(color => (
         <div
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
            key={color.name}
         />
      ));

      return (
         <div className={classes.root} onClick={this.handleClick}>
            <div className={classes.delete}>
               <DeleteIcon
                  className={classes.deleteIcon}
                  style={{ transition: "all 0.3s ease-in-out" }} //inline to override styles
                  onClick={this.handleDelete}
               />
            </div>
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
               {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
         </div>
      );
   }
}

export default withStyles(styles)(MiniPalette);
