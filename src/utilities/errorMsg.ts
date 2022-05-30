import React from 'react'
import Swal from 'sweetalert2'

const errorMsg = (errorTitle:string, errorMessage="") => {
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