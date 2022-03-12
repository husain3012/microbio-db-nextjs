import React from "react";
import Link from "next/link";
import classes from "./FourOhFour.module.css";
const FourOhFour = () => {
  return (
    <div className={classes.container}>
      <h1>Uh Oh! YOU SHOULD NOT BE HERE!</h1>
      <Link href="/">
        <a>
          <h3>Go Home by clicking me</h3>
        </a>
      </Link>
    </div>
  );
};

export default FourOhFour;
