'use client'
/*global kakao*/

import Script from 'next/script'
import { useQuery } from 'react-query'
import axios from 'axios'
import { RoomType } from '@/interface'

import { DEFAULT_LAT, DEFAULT_LNG, ZOOM_LEVEL } from '@/constants'

import { FullPageLoader } from '../Loader'

declare global {
  interface Window {
    kakao: any
  }
}

export default function DetailRoomMap({ data }: { data: RoomType }) {
  // @see - https://apis.map.kakao.com/web/documentation/#load
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new window.kakao.maps.LatLng(data?.lat, data?.lng),
        level: 5,
      }

      const map = new window.kakao.maps.Map(mapContainer, mapOption)

      // @see - https://apis.map.kakao.com/web/sample/basicMarker/
      // 마커가 표시될 위치입니다
      const markerPosition = new window.kakao.maps.LatLng(data.lat, data.lng)

      // 마커 이미지 설정
      const imageSrc = '/images/marker-icon.png'
      const imageSize = new window.kakao.maps.Size(30, 30)
      const imageOption = { offset: new window.kakao.maps.Point(16, 46) }

      // 마커 이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      )

      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      })

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map)

      // custom overlay를 설정해줍니다
      const content = `<div class="custom_overlay">${data.price?.toLocaleString()}원</div>`

      // custom overlay를 생성합니다
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
      })
      // 커스텀 오버레이가 지도 위에 표시되도록 설정합니다
      customOverlay.setMap(map)

      // @see - https://apis.map.kakao.com/web/sample/addMapControl/
      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new window.kakao.maps.MapTypeControl()

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT)

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      const zoomControl = new window.kakao.maps.ZoomControl()
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)
    })
  }
  return (
    <>
      {data ? (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakaoMap}
        />
      ) : (
        <FullPageLoader />
      )}
      <div id="map" className="w-full h-[500px] border border-gray-300" />
    </>
  )
}
