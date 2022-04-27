import React from 'react'
import Swal from 'sweetalert2'

const errorMsg = (errorMessage?: string) => {
    return (
        Swal.fire({
            title: 'Erro de entrada de dados',
            text: errorMessage ? errorMessage : '',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    )
  }

export default errorMsg;