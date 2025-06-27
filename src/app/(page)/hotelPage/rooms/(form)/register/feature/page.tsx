'use client'

import { roomFormState } from '@/atom'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Stepper from '@/components/Form/Stepper'
import NextButton from '@/components/Form/NextButton'
import cn from 'classnames'
import {
  AiOutlineCheckCircle,
  AiOutlineDesktop,
  AiOutlineWifi,
} from 'react-icons/ai'
import { BsDoorClosed } from 'react-icons/bs'
import { PiBathtub, PiMountainsDuotone } from 'react-icons/pi'
import { MdOutlineLocalLaundryService } from 'react-icons/md'
import { LuParkingCircle, LuWind } from 'react-icons/lu'
import { GiBarbecue } from 'react-icons/gi'
import { FormUrl } from '@/constants'

export interface RoomFeatureProps {
  freeCancel?: boolean
  selfCheckIn?: boolean
  officeSpace?: boolean
  hasMountainView?: boolean
  hasShampoo?: boolean
  hasFreeLaundry?: boolean
  hasAirConditioner?: boolean
  hasWifi?: boolean
  hasBarbeque?: boolean
  hasFreeParking?: boolean
}

export default function RoomRegisterFeature() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RoomFeatureProps>()

  const onSubmit = (data: RoomFeatureProps) => {
    setRoomForm({
      ...roomForm,
      freeCancel: data.freeCancel,
      selfCheckIn: data.selfCheckIn,
      officeSpace: data.officeSpace,
      hasMountainView: data.hasMountainView,
      hasShampoo: data.hasShampoo,
      hasFreeLaundry: data.hasFreeLaundry,
      hasAirConditioner: data.hasAirConditioner,
      hasWifi: data.hasWifi,
      hasBarbeque: data.hasBarbeque,
      hasFreeParking: data.hasFreeParking,
    })
    router.push(FormUrl.IMAGE)
  }

  const onClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    title: keyof RoomFeatureProps,
  ) => {
    setValue(title, event?.target?.checked)
  }

  useEffect(() => {
    if (roomForm) {
      setValue('freeCancel', roomForm?.freeCancel)
      setValue('selfCheckIn', roomForm?.selfCheckIn)
      setValue('officeSpace', roomForm?.officeSpace)
      setValue('hasMountainView', roomForm?.hasMountainView)
      setValue('hasShampoo', roomForm?.hasShampoo)
      setValue('hasFreeLaundry', roomForm?.hasFreeLaundry)
      setValue('hasAirConditioner', roomForm?.hasAirConditioner)
      setValue('hasWifi', roomForm?.hasWifi)
      setValue('hasBarbeque', roomForm?.hasBarbeque)
      setValue('hasFreeParking', roomForm?.hasFreeParking)
    }
  }, [roomForm, setValue])

  useEffect(() => {
    router.prefetch(FormUrl.IMAGE)
  }, [router])

  return (
    <>
      <Stepper count={4} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 편의시설 정보를 추가해주세요
        </h1>
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 px-10">
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('freeCancel') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'freeCancel')}
              {...register('freeCancel')}
              className="hidden"
            />
            <AiOutlineCheckCircle className="text-lg md:text-2xl" />
            무료 취소
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('selfCheckIn') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'selfCheckIn')}
              {...register('selfCheckIn')}
              className="hidden"
            />
            <BsDoorClosed className="text-lg md:text-2xl" />
            셀프 체크인
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('officeSpace') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'officeSpace')}
              {...register('officeSpace')}
              className="hidden"
            />
            <AiOutlineDesktop className="text-lg md:text-2xl" />
            사무시설
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('hasMountainView') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasMountainView')}
              {...register('hasMountainView')}
              className="hidden"
            />
            <PiMountainsDuotone className="text-lg md:text-2xl" />
            마운틴 뷰
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('hasShampoo') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasShampoo')}
              {...register('hasShampoo')}
              className="hidden"
            />
            <PiBathtub className="text-lg md:text-2xl" />
            샴푸 및 욕실 용품
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('hasFreeLaundry') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasFreeLaundry')}
              {...register('hasFreeLaundry')}
              className="hidden"
            />
            <MdOutlineLocalLaundryService className="text-lg md:text-2xl" />
            무료 세탁
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('hasAirConditioner') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasAirConditioner')}
              {...register('hasAirConditioner')}
              className="hidden"
            />
            <LuWind className="text-lg md:text-2xl" />
            에어컨
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('hasWifi') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasWifi')}
              {...register('hasWifi')}
              className="hidden"
            />
            <AiOutlineWifi className="text-lg md:text-2xl" />
            무료 와이파이
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('hasBarbeque') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasBarbeque')}
              {...register('hasBarbeque')}
              className="hidden"
            />
            <GiBarbecue className="text-lg md:text-2xl" />
            바베큐 시설
          </label>
          <label
            className={cn(
              'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
              { 'border-2 border-black': !!watch('hasFreeParking') },
            )}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasFreeParking')}
              {...register('hasFreeParking')}
              className="hidden"
            />
            <LuParkingCircle className="text-lg md:text-2xl" />
            무료 주차
          </label>
        </section>
        <NextButton type="submit" />
      </form>
    </>
  )
}
