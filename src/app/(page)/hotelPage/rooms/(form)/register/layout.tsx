import { ReactNode } from 'react'

export default function RoomRegisterLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <section className="max-w-4xl mx-auto px-4 min-h-screen py-20">
      {children}
    </section>
  )
}
