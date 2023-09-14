import React from "react";
import { Button } from '@mui/material';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import '../../assets/scss/_modal-address.scss';

export default function ModalAddress() {
   return (
      <Modal open={showModal} onClose={onCloseModal} center>
         <div className="address__box">
            <div className="flex justify-end delivery__cancel">
               <button>
               </button>
            </div>
            <div className="address__title">
               <h5>Выбрать на карте</h5>
            </div>
            {/* <iframe
               className="map"
               src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d196984.47137915707!2d78.4303487599661!3d39.51714459994583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1646840209206!5m2!1sru!2s"
               width="100%"
               height="500"
               style="border:0;"
               loading="lazy"
            ></iframe> */}
         </div>
      </Modal>
   );
}
