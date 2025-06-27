'use client'

import { roomFormState } from '@/atom'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Stepper from '@/components/Form/Stepper'
import NextButton from '@/components/Form/NextButton'
import AddressSearch from '@/components/Form/AddressSearch'
import { FormUrl } from '@/constants'

interface RoomAddressProps {
  address?: string
}

export default function RoomRegisterAddress() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomAddressProps>()

  const onSubmit = (data: RoomAddressProps) => {
    setRoomForm({
      ...roomForm,
      address: data?.address,
    })
    router.push(FormUrl.FEATURE)
  }

  useEffect(() => {
    if (roomForm) {
      setValue('address', roomForm.address)
    }
  }, [roomForm, setValue])

  useEffect(() => {
    router.prefetch(FormUrl.FEATURE)
  }, [router])

  return (
    <>
      <Stepper count={3} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 위치를 입력해주세요
        </h1>
        <AddressSearch
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <NextButton type="submit" />
      </form>
    </>
  )
}
