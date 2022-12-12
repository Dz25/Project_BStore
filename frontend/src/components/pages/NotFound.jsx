import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <p> Whatever you are looking for, it is not here.</p>
      <Link to="/">Back to homepage</Link>
    </div>
  );
}

export default NotFound;
