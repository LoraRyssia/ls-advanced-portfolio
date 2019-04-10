import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/portfolio";
import "./scripts/reviews";
import "./scripts/parallax";
import "./scripts/mobile-menu";