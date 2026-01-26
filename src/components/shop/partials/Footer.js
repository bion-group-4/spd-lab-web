import React, { Fragment } from "react";
import moment from "moment";

const Footer = (props) => {
  return (
    <Fragment>
      <footer
        style={{ background: "#303031", color: "#87898A" }}
        className="z-10 py-2 px-4 md:px-12 text-center fixed bottom-0 left-0 w-full"
      >
        Develop & Design cprasatya © Copyright {moment().format("YYYY")}
      </footer>
    </Fragment>
  );
};

export default Footer;
