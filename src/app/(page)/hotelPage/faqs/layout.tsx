import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="mt-20 p-10 min-h-[80vh]">{children}</div>
}
