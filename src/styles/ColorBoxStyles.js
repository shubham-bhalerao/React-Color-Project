import chroma from "chroma-js";
import sizes from "./sizes";
export default {
   ColorBox: {
      width: "20%",
      height: props => (props.showLink ? "25%" : "50%"),
      margin: "0 auto",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      marginBottom: "-4px",
      "&:hover button": {
         opacity: 1
      },
      [sizes.down("lg")]: {
         width: "25%",
         height: props => (props.showLink ? "20%" : "33%")
      },
      [sizes.down("md")]: {
         width: "50%",
         height: props => (props.showLink ? "20%" : "33%")
      },
      [sizes.down("xs")]: {
         width: "100%",
         height: props => (props.showLink ? "20%" : "33%")
      }
   },
   copyText: {
      color: props =>
         chroma.contrast(props.background, "black") < 6 ? "black" : "rgba(255,255,255,0.8)"
   },
   colorName: {
      color: props =>
         chroma.contrast(props.background, "black") < 6 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"
   },
   seeMore: {
      color: props =>
         chroma.contrast(props.background, "black") < 6
            ? "rgba(255,255,255,0.8)"
            : "rgba(0,0,0,0.6)",
      background: "rgba(255, 255, 255, 0.3)",
      position: "absolute",
      border: "none",
      right: "0px",
      bottom: "0px",
      width: "60px",
      height: "30px",
      textAlign: "center",
      lineHeight: "30px",
      textTransform: "uppercase"
   },
   copyButton: {
      color: props =>
         chroma.contrast(props.background, "black") < 6
            ? "white"
            : "rgba(0,0,0,0.6)",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none",
      opacity: 0
   },
   boxContent: {
      position: "absolute",
      width: "100%",
      left: "0px",
      bottom: "0px",
      padding: "10px",
      color: "black",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontSize: "12px"
   },
   copyOverlay: {
      opacity: "0",
      zIndex: "0",
      width: "100%",
      height: "100%",
      transition: "transform 0.6s ease-in-out",
      transform: "scale(0.1)"
   },
   showOverlay: {
      opacity: "1",
      transform: "scale(50)",
      zIndex: "10",
      position: "absolute"
   },
   copyMessage: {
      color: props =>
         chroma.contrast(props.background, "black") < 6
            ? "white"
            : "rgba(0,0,0,0.6)",
      position: "fixed",
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontSize: "4rem",
      transform: "scale(0.1)",
      opacity: "0",
      "& h1": {
         fontWeight: "400",
         textShadow: "1px 2px black",
         background: "rgba(255, 255, 255, 0.2)",
         width: "100%",
         textAlign: "center",
         marginBottom: "0",
         padding: "1rem",
         textTransform: "uppercase",
         [sizes.down("xs")]: {
            fontSize: "5rem"
         }
      },
      "& p": {
         fontSize: "2rem",
         fontWeight: "100"
      },
      zIndex: "-5" //bug when cursor at middle of the page it shows copy text of last

   },
   showMessage: {
      opacity: "1",
      transform: "scale(1)",
      zIndex: "25",
      transition: "all 0.4s ease-in-out",
      transitionDelay: "0.3s"
   }
};
