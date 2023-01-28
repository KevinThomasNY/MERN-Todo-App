import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <section className="section center-div">
      <div className="error-page">
        <h2>Error 404</h2>
        <h5>Page Not Found</h5>
        <Link to="/" className="btn">
          back home
        </Link>
      </div>
    </section>
  );
};

export default Error;
