import React from 'react'
import Swal from 'sweetalert2'

const errorMsg = (errorTitle="Erro de entrada de dados", errorMessage="") => {
    return (
        Swal.fire({
            title: errorTitle,
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    )
  }

export default errorMsg;