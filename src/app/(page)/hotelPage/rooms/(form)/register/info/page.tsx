'use client'

import { roomFormState } from '@/atom'
import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'
import { FormUrl } from '@/constants'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

interface RoomInfoProps {
  title?: string
  desc?: string
  price?: number
  bedroomDesc?: string
}

export default function RoomRegisterInfo() {
  const router = useRouter()
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomInfoProps>()

  const onSubmit = (data: RoomInfoProps) => {
    setRoomForm({
      ...roomForm,
      title: data.title,
      desc: data.desc,
      bedroomDesc: data.bedroomDesc,
      price: data.price,
    })
    router.push(FormUrl.ADDRESS)
  }

  useEffect(() => {
    if (roomForm) {
      setValue('bedroomDesc', roomForm?.bedroomDesc)
      setValue('title', roomForm?.title)
      setValue('price', roomForm?.price)
      setValue('desc', roomForm?.desc)
    }
  }, [roomForm, setValue])

  useEffect(() => {
    router.prefetch(FormUrl.ADDRESS)
  }, [router])

  return (
    <>
      <Stepper count={2} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 기본 정보를 입력해주세요
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            숙소 이름
          </label>
          <input
            {...register('title', { required: true, maxLength: 30 })}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black"
          />
          {errors.title && errors.title.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
          {errors.title && errors.title.type === 'maxLength' && (
            <span className="text-red-600 text-sm">
              설명은 30자 이내로 작성해주세요.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="text-lg font-semibold">
            숙소 설명
          </label>
          <textarea
            rows={3}
            {...register('desc', { required: true })}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black resize-none"
          />
          {errors.desc && errors.desc.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-lg font-semibold">
            숙소 가격 (1박 기준)
          </label>
          <input
            type="number"
            {...register('price', { required: true })}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black"
          />
          {errors.price && errors.price.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bedroomDesc" className="text-lg font-semibold">
            침실 설명
          </label>
          <textarea
            rows={3}
            {...register('bedroomDesc', { required: true, maxLength: 100 })}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black resize-none"
          />
          {errors.bedroomDesc && errors.bedroomDesc.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
          {errors.bedroomDesc && errors.bedroomDesc.type === 'maxLength' && (
            <span className="text-red-600 text-sm">
              설명은 100자 이내로 작성해주세요.
            </span>
          )}
        </div>
        <NextButton type="submit" disabled={isSubmitting || disableSubmit} />
      </form>
    </>
  )
}
