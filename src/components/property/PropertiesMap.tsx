import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Bed, Bath, Maximize } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import { formatPrice, formatArea, getLocalizedText } from '@/utils/format'
import type { Language, Property } from '@/types'

import 'leaflet/dist/leaflet.css'

interface PropertiesMapProps {
  properties: Property[]
  lang: Language
  className?: string
}

const DEFAULT_CENTER: [number, number] = [41.6994, 2.8451]
const SINGLE_ZOOM = 14
const MAX_FIT_ZOOM = 15

const pinIcon = L.divIcon({
  className: 'property-map-pin',
  html: `
    <span class="property-map-pin__marker" aria-hidden="true">
      <svg viewBox="0 0 24 36" width="28" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#c9a962"/>
        <circle cx="12" cy="12" r="5" fill="#1a1a1a"/>
      </svg>
    </span>
  `,
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -38],
})

function FitToProperties({ positions }: { positions: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    if (positions.length === 0) {
      map.setView(DEFAULT_CENTER, 11)
      return
    }

    if (positions.length === 1) {
      map.setView(positions[0], SINGLE_ZOOM)
      return
    }

    const bounds = L.latLngBounds(positions)
    map.fitBounds(bounds, {
      padding: [48, 48],
      maxZoom: MAX_FIT_ZOOM,
    })
  }, [map, positions])

  return null
}

export function PropertiesMap({ properties, lang, className = '' }: PropertiesMapProps) {
  const currency = useAppStore((state) => state.currency)

  const mappable = useMemo(
    () =>
      properties.filter(
        (property) =>
          Number.isFinite(property.coordinates?.lat) &&
          Number.isFinite(property.coordinates?.lng),
      ),
    [properties],
  )

  const positions = useMemo(
    (): [number, number][] =>
      mappable.map((property) => [property.coordinates.lat, property.coordinates.lng]),
    [mappable],
  )

  if (mappable.length === 0) {
    return (
      <div
        className={`flex h-[450px] lg:h-[550px] items-center justify-center rounded-xl border border-charcoal/10 bg-cream ${className}`}
      >
        <p className="text-sm text-charcoal/50">
          {lang === 'es'
            ? 'No hay propiedades con ubicación disponible.'
            : lang === 'ca'
              ? 'No hi ha propietats amb ubicació disponible.'
              : lang === 'en'
                ? 'No properties with location available.'
                : 'Aucune propriété avec emplacement disponible.'}
        </p>
      </div>
    )
  }

  return (
    <div className={`properties-map relative h-[450px] lg:h-[550px] overflow-hidden rounded-xl border border-charcoal/10 ${className}`}>
      <MapContainer
        center={positions[0] ?? DEFAULT_CENTER}
        zoom={SINGLE_ZOOM}
        scrollWheelZoom={false}
        className="h-full w-full"
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FitToProperties positions={positions} />
        {mappable.map((property) => {
          const title = getLocalizedText(property.title, lang)
          const location = getLocalizedText(property.location, lang)
          const detailUrl = `/${lang}/properties/${property.slug}`
          const image = property.images[0]

          return (
            <Marker
              key={property.id}
              position={[property.coordinates.lat, property.coordinates.lng]}
              icon={pinIcon}
            >
              <Popup className="property-map-popup" maxWidth={280} minWidth={220}>
                <Link to={detailUrl} className="property-map-popup__card">
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="property-map-popup__image"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="property-map-popup__body">
                    <p className="property-map-popup__price">
                      {formatPrice(property.price, currency, lang)}
                    </p>
                    <p className="property-map-popup__title">{title}</p>
                    <p className="property-map-popup__location">{location}</p>
                    <div className="property-map-popup__meta">
                      <span>
                        <Bed size={12} /> {property.bedrooms}
                      </span>
                      <span>
                        <Bath size={12} /> {property.bathrooms}
                      </span>
                      <span>
                        <Maximize size={12} /> {formatArea(property.builtArea)}
                      </span>
                    </div>
                  </div>
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
