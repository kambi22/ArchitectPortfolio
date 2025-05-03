
import { Grid, Skeleton } from '@mui/material';
import React from 'react';  // You must import React if not already
import Swal from "sweetalert2";


export const notify = (Icon, Title, Text) => {
   Swal.fire({
      icon: Icon,
      title: Title,
      text: Text,
      timer: 5000,
      showConfirmButton: false
   })
};
export const notifyconfirm = (Icon, Title, Text, confirm, cancel) => {
   return Swal.fire({
     icon: Icon,
     title: Title,
     text: Text,
     showConfirmButton: confirm,
     showCancelButton: cancel,
     confirmButtonText: 'Yes',
     cancelButtonText: 'Cancel',
   });
 };
 
 export const toast = (Icon, Title, position, bool) => {
   Swal.fire({
      icon: Icon,
      position: position,
      title: Title,
      toast: bool,
      timer: 5000,
      showConfirmButton: false,
      timerProgressBar: true,
   });
};






export function LoadingCard() {
   return (
       
        

<div className="w-100 bg ">
  <Skeleton className='rounded-4 w-100' variant="rounded" height={220} />

  <div className="p-2 w-100">
    <div className="d-flex w-100 mt-2">
      <Skeleton animation='wave' className='rounded-3' variant="rounded" width={130} height={30} />
      <Skeleton animation='wave' className='rounded-3 ms-auto' variant="rounded" width={70} height={30} />
    </div>
    <Skeleton animation='wave' className='rounded-3 mt-3' variant="rounded" width={150} height={20} />

    <div className="d-flex w-100 mt-2">
      <Skeleton animation='wave' className='rounded-3' variant="rounded" width={130} height={20} />
      <Skeleton animation='wave' className='rounded-3 mx-auto' variant="rounded" width={70} height={20} />
    </div>
    <Skeleton animation='wave' className='rounded-3 mt-3' variant="rounded" width={200} height={20} />

  </div>
</div>


     
   )
};



