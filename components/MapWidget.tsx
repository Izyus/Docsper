import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'

// Рабочий токен Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYWVyc2ZyZWVtYW4iLCJhIjoiY21jMmRqcnN5MDdyZjJtcXlkc25wMXFleiJ9.gvDjHFoKKAYip_br0MDllA'

const pharmaciesData = {
  'tel-aviv': {
    center: [34.78057, 32.08088],
    zoom: 13,
    pharmacies: [
      {
        name: 'Аптека Тель-Авив Центр',
        coords: [34.78057, 32.08088],
        delivery: '30-60 мин',
        hours: '08:00-22:00',
        rating: 4.8,
        distance: '0.2 км',
        type: 'Круглосуточная',
        phone: '+972-3-123-4567',
        color: '#FF6B6B',
        icon: '🏥'
      },
      {
        name: 'Аптека на Дизенгоф',
        coords: [34.77398, 32.08692],
        delivery: '45-90 мин',
        hours: '09:00-21:00',
        rating: 4.6,
        distance: '0.8 км',
        type: 'Стандартная',
        phone: '+972-3-234-5678',
        color: '#4ECDC4',
        icon: '💊'
      },
      {
        name: 'СуперФарм Кармель',
        coords: [34.79246, 32.07219],
        delivery: '60-120 мин',
        hours: 'Круглосуточно',
        rating: 4.9,
        distance: '1.2 км',
        type: 'Сеть',
        phone: '+972-3-345-6789',
        color: '#45B7D1',
        icon: '🏪'
      },
    ]
  },
  'moscow': {
    center: [37.6173, 55.7558],
    zoom: 12,
    pharmacies: [
      {
        name: 'Аптека 36.6 на Арбате',
        coords: [37.5900, 55.7494],
        delivery: '20-40 мин',
        hours: '08:00-23:00',
        rating: 4.7,
        distance: '0.3 км',
        type: 'Сеть',
        phone: '+7-495-123-4567',
        color: '#FF6B6B',
        icon: '🏥'
      },
      {
        name: 'Ригла на Тверской',
        coords: [37.6173, 55.7558],
        delivery: '30-60 мин',
        hours: 'Круглосуточно',
        rating: 4.8,
        distance: '0.1 км',
        type: 'Круглосуточная',
        phone: '+7-495-234-5678',
        color: '#4ECDC4',
        icon: '💊'
      },
      {
        name: 'Аптека Нео-Фарм',
        coords: [37.6000, 55.7600],
        delivery: '45-90 мин',
        hours: '09:00-22:00',
        rating: 4.5,
        distance: '0.7 км',
        type: 'Стандартная',
        phone: '+7-495-345-6789',
        color: '#45B7D1',
        icon: '🏪'
      },
      {
        name: 'Аптека Здоровье',
        coords: [37.6300, 55.7500],
        delivery: '25-50 мин',
        hours: '08:00-24:00',
        rating: 4.6,
        distance: '0.5 км',
        type: 'Сеть',
        phone: '+7-495-456-7890',
        color: '#FFA500',
        icon: '💊'
      }
    ]
  },
  'boston': {
    center: [-71.0589, 42.3601],
    zoom: 13,
    pharmacies: [
      {
        name: 'CVS Pharmacy Downtown',
        coords: [-71.0589, 42.3601],
        delivery: '15-30 мин',
        hours: '07:00-22:00',
        rating: 4.6,
        distance: '0.1 км',
        type: 'Сеть',
        phone: '+1-617-123-4567',
        color: '#FF6B6B',
        icon: '🏥'
      },
      {
        name: 'Walgreens Back Bay',
        coords: [-71.0700, 42.3500],
        delivery: '20-45 мин',
        hours: 'Круглосуточно',
        rating: 4.7,
        distance: '0.8 км',
        type: 'Круглосуточная',
        phone: '+1-617-234-5678',
        color: '#4ECDC4',
        icon: '💊'
      },
      {
        name: 'Rite Aid Beacon Hill',
        coords: [-71.0650, 42.3650],
        delivery: '30-60 мин',
        hours: '08:00-21:00',
        rating: 4.4,
        distance: '0.6 км',
        type: 'Стандартная',
        phone: '+1-617-345-6789',
        color: '#45B7D1',
        icon: '🏪'
      },
      {
        name: 'Independent Pharmacy',
        coords: [-71.0500, 42.3550],
        delivery: '25-50 мин',
        hours: '09:00-20:00',
        rating: 4.8,
        distance: '0.4 км',
        type: 'Независимая',
        phone: '+1-617-456-7890',
        color: '#9B59B6',
        icon: '💊'
      }
    ]
  }
}

interface MapWidgetProps {
  city?: 'tel-aviv' | 'moscow' | 'boston'
  rect?: boolean
}

export default function MapWidget({ city = 'tel-aviv', rect = false }: MapWidgetProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const cityData = pharmaciesData[city]
  const [lng] = useState(cityData.center[0])
  const [lat] = useState(cityData.center[1])
  const [zoom] = useState(cityData.zoom)

  useEffect(() => {
    // Удаляем старую карту при смене города
    if (map.current) {
      map.current.remove()
      map.current = null
    }
    // Очищаем контейнер
    if (mapContainer.current) {
      mapContainer.current.innerHTML = ''
    }
    // Создаём новую карту
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [cityData.center[0], cityData.center[1]],
        zoom: cityData.zoom,
        pitch: 30,
        bearing: 0
      })

      map.current.on('load', () => {
        if (!map.current) return
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
        cityData.pharmacies.forEach((pharmacy, index) => {
          if (!map.current) return
          const el = document.createElement('div')
          el.className = 'pharmacy-marker'
          el.style.cssText = `
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${pharmacy.color}, ${pharmacy.color}dd);
            border: 4px solid white;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2);
            cursor: pointer;
            position: relative;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
          `
          el.innerHTML = `
            <div style="color: white; font-size: 22px; font-weight: bold; text-align: center; line-height: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.4); filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">${pharmacy.icon}</div>
            <div style="position: absolute; top: -8px; right: -8px; background: linear-gradient(135deg, #FFD700, #FFA500); color: #333; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); text-shadow: 0 1px 1px rgba(255,255,255,0.5);">${index + 1}</div>
            <div style="position: absolute; top: 3px; left: 3px; right: 3px; bottom: 3px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent); pointer-events: none;"></div>
            <div style="position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; border-radius: 50%; background: linear-gradient(135deg, ${pharmacy.color}40, transparent); pointer-events: none; animation: pulse 2s infinite;"></div>
          `
          el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.2)'
            el.style.boxShadow = '0 12px 35px rgba(0,0,0,0.4), 0 6px 18px rgba(0,0,0,0.3)'
            el.style.zIndex = '1000'
          })
          el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)'
            el.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)'
            el.style.zIndex = 'auto'
          })
          const popup = new mapboxgl.Popup({ 
            offset: 25,
            maxWidth: '320px',
            className: 'pharmacy-popup'
          }).setHTML(`
            <div style="padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <!-- Заголовок -->
              <div style="
                background: linear-gradient(135deg, ${pharmacy.color}, ${pharmacy.color}dd);
                color: white;
                padding: 18px;
                border-radius: 12px 12px 0 0;
                margin: -12px -12px 0 -12px;
                position: relative;
                overflow: hidden;
              ">
                <!-- Декоративный элемент -->
                <div style="
                  position: absolute;
                  top: -10px;
                  right: -10px;
                  width: 60px;
                  height: 60px;
                  background: rgba(255,255,255,0.1);
                  border-radius: 50%;
                "></div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; position: relative; z-index: 1;">
                  <span style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">${pharmacy.icon}</span>
                  <h3 style="margin: 0; font-size: 17px; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${pharmacy.name}</h3>
                </div>
                <div style="display: flex; align-items: center; gap: 14px; font-size: 13px; opacity: 0.95; position: relative; z-index: 1;">
                  <span style="display: flex; align-items: center; gap: 2px;">⭐ ${pharmacy.rating}</span>
                  <span style="display: flex; align-items: center; gap: 2px;">📍 ${pharmacy.distance}</span>
                  <span style="display: flex; align-items: center; gap: 2px;">🏷️ ${pharmacy.type}</span>
                </div>
              </div>

              <!-- Информация -->
              <div style="padding: 18px;">
                <div style="display: grid; gap: 14px;">
                  <!-- Доставка -->
                  <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 10px; border: 1px solid #dee2e6;">
                    <span style="font-size: 18px;">🚚</span>
                    <div>
                      <div style="font-weight: 600; font-size: 14px; color: #333; margin-bottom: 2px;">Доставка</div>
                      <div style="font-size: 12px; color: #666;">${pharmacy.delivery}</div>
                    </div>
                  </div>

                  <!-- Режим работы -->
                  <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 10px; border: 1px solid #dee2e6;">
                    <span style="font-size: 18px;">🕒</span>
                    <div>
                      <div style="font-weight: 600; font-size: 14px; color: #333; margin-bottom: 2px;">Режим работы</div>
                      <div style="font-size: 12px; color: #666;">${pharmacy.hours}</div>
                    </div>
                  </div>

                  <!-- Телефон -->
                  <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 10px; border: 1px solid #dee2e6;">
                    <span style="font-size: 18px;">📞</span>
                    <div>
                      <div style="font-weight: 600; font-size: 14px; color: #333; margin-bottom: 2px;">Телефон</div>
                      <div style="font-size: 12px; color: #666;">${pharmacy.phone}</div>
                    </div>
                  </div>
                </div>

                <!-- Кнопки действий -->
                <div style="display: grid; gap: 10px; margin-top: 18px;">
                  <button style="
                    background: linear-gradient(135deg, ${pharmacy.color}, ${pharmacy.color}dd);
                    color: white;
                    border: none;
                    padding: 14px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
                  " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'">
                    🛒 Заказать доставку
                  </button>
                  <button style="
                    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                    color: #333;
                    border: 1px solid #dee2e6;
                    padding: 12px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 13px;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                  " onmouseover="this.style.background='linear-gradient(135deg, #e9ecef, #dee2e6)'; this.style.transform='scale(1.02)'" onmouseout="this.style.background='linear-gradient(135deg, #f8f9fa, #e9ecef)'; this.style.transform='scale(1)'">
                    📍 Построить маршрут
                  </button>
                </div>
              </div>
            </div>
          `)
          new mapboxgl.Marker(el)
            .setLngLat(pharmacy.coords as [number, number])
            .setPopup(popup)
            .addTo(map.current)
        })
        map.current.on('zoom', () => {
          const currentZoom = map.current?.getZoom() || 0
          const markers = document.querySelectorAll('.pharmacy-marker')
          markers.forEach((marker) => {
            const markerElement = marker as HTMLElement
            if (currentZoom < 12) {
              markerElement.style.transform = 'scale(0.8)'
              markerElement.style.opacity = '0.8'
            } else {
              markerElement.style.transform = 'scale(1)'
              markerElement.style.opacity = '1'
            }
          })
        })
      })
    }
    // Чистим карту при размонтировании
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [city])

  return (
    <div style={{ 
      width: '100%', 
      height: rect ? 220 : 350, 
      borderRadius: rect ? 10 : 16, 
      overflow: 'hidden', 
      marginTop: rect ? 12 : 24,
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  )
} 