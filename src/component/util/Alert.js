import Swal from 'sweetalert2'

export const warning = () => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    iconHtml: '<i class="ri-alert-line"></i>',
    customClass: {
      icon: 'no-border'
    },
    showCancelButton: true,
    confirmButtonText: 'Logout',
    customClass: {
      confirmButton: 'btn bg-second text-light m15-right',
      cancelButton: 'btn bg-darkGray text-light'
    },
    buttonsStyling: false
  });
};