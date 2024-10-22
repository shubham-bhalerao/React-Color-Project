import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
   constructor(props) {
      super(props);
      this.state = { copied: false };
      this.changeCopyState = this.changeCopyState.bind(this);
   }
   changeCopyState() {
      this.setState({ copied: true }, () => {
         setTimeout(() => this.setState({ copied: false }), 1500);
      });
   }

   generateRandomCopyText() {
      const words = ["COPIED!", "PASTE ME!", "PANDA STYLE!", "IT'LL ROCK!", "GOT IT!"];
      const r = Math.floor(Math.random() * words.length);
      return words[r];
   }

   render() {
      const { background, name, moreUrl, showLink, classes } = this.props;
      const { copied } = this.state;
      const msg = this.generateRandomCopyText();
      return (
         <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div
               style={{ backgroundColor: background }}
               className={classes.ColorBox}
            >
               <div
                  style={{ background }}
                  className={`${classes.copyOverlay} ${copied &&
                     classes.showOverlay}`}
               />
               <div
                  className={`${classes.copyMessage} ${copied &&
                     classes.showMessage}`}
               >
                  <h1>{msg}</h1>
                  <p>{background}</p>
               </div>
               <div>
                  <div className={classes.boxContent}>
                     <span className={classes.colorName}>{name}</span>
                  </div>
                  <button className={classes.copyButton}>Copy</button>
               </div>
               <div>
                  {showLink && (
                     <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={classes.seeMore}>More</span>
                     </Link>
                  )}
               </div>
            </div>
         </CopyToClipboard>
      );
   }
}
export default withStyles(styles)(ColorBox);
