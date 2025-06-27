import FeatureSection from '@/components/RoomDetail/FeatureSection'
import HeaderSection from '@/components/RoomDetail/HeaderSection'

import { ParamsProps, RoomType } from '@/interface'
import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { Loader } from '@/components/Loader'

export default async function RoomPage({ params }: ParamsProps) {
  const { id } = params
  const data: RoomType = await getData(id)

  const Comment = dynamic(() => import('@/components/Comment'), {
    loading: () => <Loader />,
  })

  const MapSection = dynamic(
    () => import('@/components/RoomDetail/MapSection'),
    {
      loading: () => <Loader />,
      ssr: false,
    },
  )

  return (
    <div className="mt-8 mb-20 max-w-6xl mx-auto">
      <HeaderSection data={data} />
      <FeatureSection data={data} />
      <Comment room={data} />
      <MapSection data={data} />
    </div>
  )
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
      {
        next: {
          revalidate: 60 * 60,
        },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export async function generateMetadata(
  { params }: ParamsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const room = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  ).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const prevKeywords = (await parent)?.keywords || []

  return {
    title: `Nextbnb 숙소 - ${room?.title}`,
    description:
      room?.description ?? 'Fastcampus Nextbnb로 여행을 계획해보세요.',
    keywords: [room?.category, ...prevKeywords],
  }
}
