"use client";

import { useState } from "react";
import { BookingType } from "../../interface";
import Modal from "../Modal";
import axios from "axios";
import { toast } from "react-hot-toast";

interface RefundProps {
  booking: BookingType;
  canRefund: boolean;
}

export default function RefundButton({ booking, canRefund }: RefundProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRefund, setIsRefund] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleRefund = async () => {
    const res = await axios.patch("/api/bookings", {
      id: booking.id,
      status: "CANCEL",
    });

    if (res.status === 200) {
      toast.success("해당 예약을 취소했습니다.");
      setIsRefund(true);
      closeModal();
    } else {
      toast.error("다시 시도해주세요.");
    }
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        {booking?.status === "CANCEL" || isRefund ? (
          <button
            className="bg-rose-600 hover:bg-rose-500 text-white rounded-md disabled:bg-gray-300 px-5 py-2.5"
            disabled
          >
            예약 취소 완료
          </button>
        ) : (
          <button
            type="button"
            disabled={!canRefund}
            onClick={openModal}
            className="bg-rose-600 hover:bg-rose-500 text-white rounded-md disabled:bg-gray-300 px-5 py-2.5"
          >
            예약 취소하기
          </button>
        )}
      </section>
      <Modal isOpen={isOpen} closeModal={closeModal} title="예약 취소">
        <div className="flex flex-col gap-2 mt-4">
          <h1 className="text-lg font-semibold">예약을 취소 하시겠습니까?</h1>
          <p className="text-gray-600">
            예약을 취소하면 재예약이 어려울 수 있습니다. 환불금은 예약 취소 후 2~3일 내에 결제한 카드로 입금됩니다.
            동의하시는 경우에만 아래 버튼을 눌러 예약을 취소하세요.
          </p>
          <button
            type="button"
            onClick={handleRefund}
            className="mt-8 bg-rose-600 hover:bg-rose-500 text-white rounded-md px-5 py-2.5"
          >
            예약 취소하기
          </button>
        </div>
      </Modal>
    </>
  );
}
