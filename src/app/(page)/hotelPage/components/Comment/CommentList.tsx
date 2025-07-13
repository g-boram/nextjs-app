"use client";

/* eslint-disable @next/next/no-img-element */
import CommentListModal from "./CommentListModal";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { CommentApiType } from "../../interface";
import { Loader } from "../Loader";

export default function CommentList({
  isLoading,
  comments,
  roomId,
}: {
  isLoading: boolean;
  comments: CommentApiType;
  roomId: number;
}) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <h1 className="font-semibold text-xl mb-2">후기 {comments?.totalCount}개</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-12">
        {isLoading ? (
          <Loader className="md:col-span-2" />
        ) : (
          comments?.data?.map((comment) => (
            <div key={comment?.id} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  src={comment?.user?.image || "/images/user-icon.png"}
                  alt="profile img"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h1 className="font-semibold">{comment?.user?.name || "-"}</h1>
                  <div className="text-gray-500 text-xs">
                    {dayjs(comment?.createdAt)?.format("YYYY-MM-DD HH:MM:ss")}
                  </div>
                </div>
              </div>
              <div className="max-w-md text-gray-600">{comment?.body}</div>
              <button
                type="button"
                onClick={openModal}
                className="underline font-semibold flex gap-1 items-center justify-start"
              >
                더보기 <BiChevronRight className="text-xl" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="mt-8 mb-20">
        <button
          type="button"
          onClick={openModal}
          className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5"
        >
          후기 {comments?.totalCount}개 모두 보기
        </button>
      </div>
      {isOpenModal && <CommentListModal isOpen={isOpenModal} closeModal={closeModal} roomId={roomId} />}
    </>
  );
}
