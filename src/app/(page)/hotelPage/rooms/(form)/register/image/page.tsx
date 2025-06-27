/* eslint-disable @next/next/no-img-element */
'use client'

import { roomFormState } from '@/atom'
import { useRouter } from 'next/navigation'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

import { useForm } from 'react-hook-form'
import Stepper from '@/components/Form/Stepper'
import NextButton from '@/components/Form/NextButton'
import { AiFillCamera } from 'react-icons/ai'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage'
import { storage } from '@/utils/firebaseApp'
import { useSession } from 'next-auth/react'

interface RoomImageProps {
  images?: string[]
}

export default function RoomRegisterImage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  // FileReader로 읽은 이미지 객체들
  const [images, setImages] = useState<string[] | null>(null)
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
  const resetRoomForm = useResetRecoilState(roomFormState)
  let imageKeys: string[] = []

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomImageProps>()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e

    if (!files) return
    setImages([])

    Array.from(files).forEach((file: File) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
        const { result } = event.target as FileReader
        if (result) {
          setImages((val) =>
            val ? [...val, result?.toString()] : [result?.toString()],
          )
        }
      }
    })
  }

  async function uploadImages(images: string[] | null) {
    const uploadedImageUrls = []

    if (!images) return

    for (const imageFile of images) {
      // 참조 만들기
      const imageKey = uuidv4()
      const imageRef = ref(storage, `${session?.user?.id}/${imageKey}`)
      imageKeys.push(imageKey)
      try {
        // uploadString으로 firebase에 이미지 업로드하기
        const data = await uploadString(imageRef, imageFile, 'data_url')
        // downloadURL로 업로드 된 이미지 주소 가져오기
        const imageUrl = await getDownloadURL(data.ref)
        uploadedImageUrls.push(imageUrl)
      } catch (error) {
        console.error('Error uploading images: ', error)
      }
    }

    return uploadedImageUrls
  }

  const deleteImages = () => {
    imageKeys?.forEach((key) => {
      const imageRef = ref(storage, `${session?.user.id}/${key}`)
      deleteObject(imageRef)
        .then(() => {
          console.log('File Deleted: ', key)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  const onSubmit = async (data: RoomImageProps) => {
    // roomForm API 생성 요청
    // 생성 후에는 resetRoomForm으로 리코일 초기화
    // 내가 등록한 숙소 리스트로 돌아가도록 라우팅
    try {
      setDisableSubmit(true)
      uploadImages(images)
        .then(async (imageUrls) => {
          const result = await axios.post('/api/rooms', {
            ...roomForm,
            images: imageUrls,
            imageKeys: imageKeys,
          })

          if (result.status === 200) {
            toast.success('숙소를 등록했습니다.')
            resetRoomForm()
            router.push('/')
          } else {
            toast.error('데이터 생성중 문제가 발생했습니다.')
          }
        })
        .catch((error) => {
          console.error(error)
          toast.error('이미지 저장중에 문제가 발생했습니다. 다시 시도해주세요')
          deleteImages()
        })
    } catch (e) {
      setDisableSubmit(false)
      console.log(e)
      toast.error('다시 시도해주세요')
    }
  }

  return (
    <>
      <Stepper count={5} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 사진을 추가해주세요
        </h1>
        <p className="text-sm md:text-base text-gray-500 text-center">
          숙소 사진은 최대 5장까지 추가할 수 있습니다.
        </p>
        <div className="flex flex-col gap-2">
          <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <AiFillCamera className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-rose-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-rose-600 focus-within:ring-offset-2 hover:text-rose-500"
                  >
                    <span>최대 5장의 사진을</span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      {...register('images', { required: true })}
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="pl-1">업로드 해주세요</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF 등 이미지 포맷만 가능
                </p>
              </div>
            </div>
          </div>
          {errors?.images && errors?.images?.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <div className="mt-10 max-w-lg mx-auto flex flex-wrap gap-4">
          {images &&
            images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="미리보기"
                width={100}
                height={100}
                className="rounded-md"
              />
            ))}
        </div>
        <NextButton
          type="submit"
          text="완료"
          disabled={isSubmitting || disableSubmit}
        />
      </form>
    </>
  )
}
