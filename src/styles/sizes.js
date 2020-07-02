export default {
   up() {},
   down(size) {
      //exact pixels taken from bootstrap
      const sizes = {
         xs: "575.98px",
         sm: "767.98px",
         md: "991.98px",
         lg: "1199.98px",
         xl: "1600px" //taken for home page not specific value
      };
      return `@media (max-width: ${sizes[size]})`;
   }
};
