import React, { useState } from "react";
import { FaWalking } from "react-icons/fa";
import { FiAnchor } from "react-icons/fi";
import { SiSymantec } from "react-icons/si";
import { TiCancel } from "react-icons/ti";
import { MdClearAll, MdPhoneMissed, MdOutlineWavingHand } from "react-icons/md";
import { IoIosSubway, IoMdArchive } from "react-icons/io";
import DeliveredModal from "../pages/adminInformationModal/DeliveredModal";
import "../assets/scss/_order.scss";
import HoldModal from "../pages/adminInformationModal/HoldModal";
import AcceptedModal from "../pages/adminInformationModal/AcceptedModal";
import SentModal from "../pages/adminInformationModal/SentModal";
import CancelledModal from "../pages/adminInformationModal/CancelledModal";
import ArchivedModal from "../pages/adminInformationModal/ArchivedModal";
import NewModal from "../pages/adminInformationModal/NewModal";
import DressUpModal from "../pages/adminInformationModal/DressUpModal";
import AllOrderModal from "../pages/adminInformationModal/AllOrdersModal";
import VisitModal from "../pages/adminInformationModal/VisitModal";

const ProfileOrdersInfo = ({
  ordersAdmin,
  ordersAdminHold,
  ordersAdminDelivered,
  ordersAdminSent,
  ordersAdminArchived,
  ordersAdminCancelled,
  ordersAdminNew,
  ordersAdminPending,
  ordersAdminAll,
  streamUser,
}) => {
  const [show_new, set_show_new] = useState(false);
  const [show_dress_up, set_show_dress_up] = useState(false);
  const [show_delivered, set_show_delivered] = useState(false);
  const [show_hold, set_show_hold] = useState(false);
  const [show_accepted, set_show_accepted] = useState(false);
  const [show_sent, set_show_sent] = useState(false);
  const [show_cancelled, set_show_cancelled] = useState(false);
  const [show_archived, set_show_archived] = useState(false);
  const [show_order_all, set_show_order_all] = useState(false);
  const [show_visit, set_show_visit] = useState(false);

  let streamAmount = 0;
  streamUser?.forEach((stream) => (streamAmount += stream.how_many_times));

  return (
    <div className="grid__order__information">
      <div
        className="profile__cart__order order__visit"
        onClick={() => {
          set_show_visit(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Tashrif (Barchasi)</h3>
            <FaWalking size={20} />
          </div>
          <h4 className="profile__cart__number__of__order">{streamAmount}</h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__new"
        onClick={() => {
          set_show_new(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Yangi buyurtma</h3>
            <MdOutlineWavingHand size={20} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdminNew.length}
          </h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__accepted"
        onClick={() => {
          set_show_delivered(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Dostavkaga tayyor</h3>
            <SiSymantec size={20} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdmin.length}
          </h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__subway"
        onClick={() => {
          set_show_sent(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Yetkazilmoqda</h3>
            <IoIosSubway size={20} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdminSent.length}
          </h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__ready"
        onClick={() => {
          set_show_accepted(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Yetkazildi</h3>
            <SiSymantec size={20} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdminDelivered.length}
          </h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__dress_up"
        onClick={() => {
          set_show_dress_up(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Qayta qo'ngiroq</h3>
            <MdPhoneMissed size={20} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdminPending.length}
          </h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__cancelled"
        onClick={() => {
          set_show_cancelled(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Atkazlar</h3>
            <TiCancel size={25} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdminCancelled.length}
          </h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__orders"
        onClick={() => {
          set_show_hold(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Hold</h3>
            <FiAnchor size={20} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdminHold.length}
          </h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__archived"
        onClick={() => {
          set_show_archived(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Arxivlandi</h3>
            <IoMdArchive size={20} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdminArchived.length}
          </h4>
        </div>
      </div>

      <div
        className="profile__cart__order order__all"
        onClick={() => {
          set_show_order_all(true);
        }}
      >
        <div className="profile__cart__order__body">
          <div className="profile__cart__order__title">
            <h3>Barchasi</h3>
            <MdClearAll size={25} />
          </div>
          <h4 className="profile__cart__number__of__order">
            {ordersAdminAll.length}
          </h4>
        </div>
      </div>

      <DeliveredModal
        show_delivered={show_delivered}
        ordersAdmin={ordersAdmin}
        onCloseDelivered={() => {
          set_show_delivered(false);
        }}
      />

      <AcceptedModal
        show_accepted={show_accepted}
        ordersAdmin={ordersAdminDelivered}
        onCloseModal={() => {
          set_show_accepted(false);
        }}
      />

      <HoldModal
        show_hold={show_hold}
        ordersAdmin={ordersAdminHold}
        onCloseModal={() => {
          set_show_hold(false);
        }}
      />

      <SentModal
        show_sent={show_sent}
        ordersAdmin={ordersAdminSent}
        onCloseModal={() => {
          set_show_sent(false);
        }}
      />

      <CancelledModal
        show_cancelled={show_cancelled}
        ordersAdmin={ordersAdminCancelled}
        onCloseModal={() => {
          set_show_cancelled(false);
        }}
      />

      <ArchivedModal
        show_archived={show_archived}
        ordersAdmin={ordersAdminArchived}
        onCloseModal={() => {
          set_show_archived(false);
        }}
      />

      <NewModal
        show_new={show_new}
        ordersAdmin={ordersAdminNew}
        onCloseModal={() => {
          set_show_new(false);
        }}
      />

      <DressUpModal
        show_dress_up={show_dress_up}
        ordersAdmin={ordersAdminPending}
        onCloseModal={() => {
          set_show_dress_up(false);
        }}
      />

      <AllOrderModal
        show_order_all={show_order_all}
        ordersAdmin={ordersAdminAll}
        onCloseModal={() => {
          set_show_order_all(false);
        }}
      />

      <VisitModal
        show_visit={show_visit}
        streamUsers={streamUser}
        onCloseModal={() => {
          set_show_visit(false);
        }}
      />
    </div>
  );
};

export default ProfileOrdersInfo;
