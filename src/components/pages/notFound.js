import React from "react";
import { Link } from "react-router-dom";
export default function notFound() {
  return (
    <div>
      <h1 className="display-4">
        <span className="text-danger">404</span> Page Not Found
      </h1>
      <p className="lead">
        Go Back To <Link to="/">Home</Link>
      </p>
    </div>
  );
}
