import React from "react";
import Swal from "sweetalert2";

const successMsg = () => {
  return Swal.fire({
    title: "Pilar convergiu",
    text: "Resultados estão disponíveis",
    icon: "success",
    confirmButtonText: "Ok",
  });
};

export default successMsg;
