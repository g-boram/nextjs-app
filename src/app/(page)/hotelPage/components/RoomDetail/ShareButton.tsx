'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'

import { RoomType } from '@/interface'
import { CiShare1 } from 'react-icons/ci'
import { BLUR_DATA_URL } from '@/constants'
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiOutlineClose,
  AiOutlineCopy,
  AiOutlineMail,
} from 'react-icons/ai'

import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ShareButton({ data }: { data: RoomType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const handleCopyLink = () => {
    if (navigator.clipboard && window) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success('링크 복사 완료'))
        .catch(() => toast.error('다시 시도해주세요'))
    }
  }

  const handleShareTwitter = () => {
    typeof window !== 'undefined' &&
      window.open(
        `https://www.twitter.com/intent/tweet?url=${window.location.href}`,
      )
  }

  const handleShareFacebook = () => {
    typeof window !== 'undefined' &&
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      )
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-black/10"
      >
        <CiShare1 />
        <span className="underline">공유하기</span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    className="rounded-full p-2 hover:bg-black/5 mb-4"
                    onClick={closeModal}
                  >
                    <AiOutlineClose />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    숙소 공유하기
                  </Dialog.Title>
                  <div className="mt-5 flex gap-4 items-center">
                    <Image
                      src={data?.images?.[0]}
                      alt="room img"
                      width={60}
                      height={60}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="rounded-md"
                    />
                    <div className="flex items-center gap-1 text-sm">
                      <div className="text-gray-800">{data?.title}</div>
                      <div className="text-gray-600">·</div>
                      <div className="text-gray-800">{data?.category}</div>
                      <div className="text-gray-600">·</div>
                      <div className="text-gray-800">{data?.address}</div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-col-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5"
                    >
                      <AiOutlineCopy className="text-xl md:text-3xl" />
                      링크 복사
                    </button>
                    {typeof window !== 'undefined' && (
                      <Link
                        href={`mailto:?subject=FastCampus 숙소 공유하기&body=${window.location.href}`}
                        className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5"
                      >
                        <AiOutlineMail className="text-xl md:text-3xl" />
                        이메일
                      </Link>
                    )}

                    <button
                      onClick={handleShareTwitter}
                      type="button"
                      className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5"
                    >
                      <AiFillTwitterSquare className="text-xl md:text-3xl text-sky-500" />
                      트위터
                    </button>
                    <button
                      type="button"
                      onClick={handleShareFacebook}
                      className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5"
                    >
                      <AiFillFacebook className="text-xl md:text-3xl text-blue-600" />
                      페이스북
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
