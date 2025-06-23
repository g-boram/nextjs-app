import { ReactNode } from 'react'

export type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'

export interface FilterProps {
  location: string
  checkIn: string
  checkOut: string
  guest: number
  category: string
}

export interface FilterComponentProps {
  filterValue: FilterProps
  setFilterValue: React.Dispatch<React.SetStateAction<FilterProps>>
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>
}

export interface FilterLayoutProps {
  title: string
  children: ReactNode
  isShow: boolean
  dataTitle?: string
}

export interface LikeType {
  id: number
  roomId: number
  userId: number
  createdAt: string
  room: RoomType
}

export interface CommentType {
  id: number
  createdAt: string
  roomId: number
  userId: string
  body: string
  room: RoomType
  user: UserType
}

export interface CommentApiType {
  totalCount: number
  data: CommentType[]
  page?: number
  totalPage?: number
}

export interface RoomType {
  id: number
  images: string[]
  imageKeys?: string[]
  title: string
  address: string
  desc?: string
  bedroomDesc?: string
  price: number
  category: string
  lat: string
  lng: string
  user?: UserType
  userId?: number
  freeCancel: boolean
  selfCheckIn: boolean
  officeSpace: boolean
  hasMountainView: boolean
  hasShampoo: boolean
  hasFreeLaundry: boolean
  hasAirConditioner: boolean
  hasWifi: boolean
  hasBarbeque: boolean
  hasFreeParking: boolean
  likes?: LikeType[]
  comments?: CommentType[]
  bookings?: BookingType[]
  createdAt?: string
  updatedAt?: string
}

interface Account {
  id: string
  provider: string
}

export interface UserType {
  id: number
  email: string
  name?: string
  image?: string
  desc?: string
  rooms?: RoomType[]
  accounts: Account[]
  address?: string
  phone?: string
  comments?: Comment[]
  bookings?: BookingType[]
}

export interface FaqType {
  id: number
  title: string
  desc: string
}

export interface LocationType {
  lat?: string | null
  lng?: string | null
  zoom?: number
}

export interface ParamsProps {
  params: { id: string }
}

export interface BookingParamsProps {
  params: { id: string }
  searchParams: {
    checkIn: string
    checkOut: string
    guestCount: string
    totalAmount: string
    totalDays: string
  }
}

export interface BookingType {
  id: number
  roomId: number
  userId: string
  checkIn: string
  checkOut: string
  guestCount: number
  totalAmount: number
  totalDays: number
  status: 'SUCCESS' | 'CANCEL'
  room: RoomType
  user: UserType
  createAt: string
  updatedAt: string
  payments?: PaymentType[]
}

export enum PaymentStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_DEPOSIT = 'WAITING_FOR_DEPOSIT',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  PARTIAL_CANCELED = 'PARTIAL_CANCELED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
}

export interface PaymentType {
  id: string
  paymentKey: string
  bookingId: string
  amount: number
  status: PaymentStatus
  orderId: string
  orderName: string
  approvedAt: string
  mId?: string
  receiptUrl?: string
  cardNumber?: string
  method?: string
}

export interface RoomFormType {
  images?: string[]
  imageKeys?: string[]
  title?: string
  address?: string
  desc?: string
  bedroomDesc?: string
  price?: number
  category?: string
  lat?: string
  lng?: string
  userId?: number
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

export interface SearchProps {
  q: string | null
}
