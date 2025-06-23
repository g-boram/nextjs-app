"use client";

/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { CommentApiType, CommentType } from "../../interface";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { Loader } from "../Loader";

import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function CommentListModal({
  isOpen,
  closeModal,
  roomId,
}: {
  isOpen: boolean;
  closeModal: () => void;
  roomId: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {
    rootMargin: "10%",
    enableObserver: !!ref.current,
  });
  const isPageEnd = !!pageRef?.isIntersecting;

  const fetchComments = async ({ pageParam = 1 }) => {
    const { data } = await axios(`/api/comments?roomId=${roomId}&page=${pageParam}&limit=6`);

    return data as CommentApiType;
  };

  const {
    data: comments,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(`room-${roomId}-comments-infinite`, fetchComments, {
    getNextPageParam: (lastPage: any) => (lastPage?.data?.length > 0 ? lastPage.page + 1 : undefined),
  });

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNextPage();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [isPageEnd, hasNextPage, fetchNextPage]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button type="button" onClick={closeModal} className="rounded-full p-2 hover:bg-black/5 mb-4">
                    <AiOutlineClose />
                  </button>
                  <Dialog.Title as="h3" className="text-xl md:text-2xl font-medium leading-6 text-gray-900">
                    후기 전체 보기
                  </Dialog.Title>
                  <div className="mt-8 flex flex-col gap-8 mx-auto max-w-lg mb-10">
                    {comments?.pages?.map((page, index) => (
                      <React.Fragment key={index}>
                        {page.data.map((comment: CommentType) => (
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
                            <div className="max-w-lg text-gray-600">{comment?.body}</div>
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                    {(hasNextPage || isFetching) && <Loader className="mt-8" />}
                    <div ref={ref} className="w-full h-10 mb-10 z-10 touch-none" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
