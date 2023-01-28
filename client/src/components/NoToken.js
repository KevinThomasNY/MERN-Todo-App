import React from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const NoToken = () => {
  useEffect(() => {
    const MySwal = new withReactContent(Swal);
    MySwal.fire({
      title: "Oops...",
      icon: "warning",
      text: `You must be logged in`,
      allowOutsideClick: false,
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.value) {
        window.location.href = `/`;
      }
    });
  }, []);

  return <></>;
};

export default NoToken;
