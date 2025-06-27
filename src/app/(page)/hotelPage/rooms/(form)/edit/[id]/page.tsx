import RoomEditForm from '@/components/Form/RoomEditForm'
import { RoomType } from '@/interface'

interface ParamsProps {
  params: { id: string }
}

export default async function RoomEdit({ params }: ParamsProps) {
  const id = params.id
  const data: RoomType = await getData(id)
  return <RoomEditForm data={data} />
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
      {
        cache: 'no-cache',
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
