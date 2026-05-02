import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import mapPinIcon from "../img/MapPin.svg";     // Custom marker icon
import { Tooltip } from "react-leaflet";
import { formatToDMS } from "../utils/formatToDMS";
import { reverseGeocode } from "../services/geocoding";
import { useMap } from "react-leaflet";
import { useEffect } from "react";


const normalIcon = new L.Icon({
    iconRetinaUrl: mapPinIcon,
    iconUrl: mapPinIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

const hoveredIcon = new L.Icon({
    iconRetinaUrl: mapPinIcon,
    iconUrl: mapPinIcon,
    iconSize: [40, 40],     // Enlarge the icon when hovered
    iconAnchor: [20, 40],
}); 

// Component to handle add pins
function MapClickHandler({ onAddPin }: { onAddPin: (pin: Pin) => void }) {
    useMapEvents({
        click(e) {
            onAddPin({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    
    return null;
}

// Component to handle flyTo when a pin is clicked in the list
function FlyToHandler({ target }: { target: Pin | null }) { 
    const map = useMap();

    useEffect(() => {
        if(target) {
            map.flyTo([target.lat, target.lng], 15, {
                duration: 1.5,
            });
        }
    }, [target]);  //Only trigger when the target pin changes
        
    return null;
}


// Main MapView component
function MapView({
    pins,
    onAddPin,
    hoveredIndex,
    updatePin,
    selectedPin,
}: {
    pins: Pin[];
    onAddPin: (pin: Pin) => void;
    hoveredIndex: number | null;
    updatePin: (id: string, updated: Partial<Pin>) => void;
    selectedPin: Pin | null;
}) { 
  return (
    <MapContainer
          center={[-37.8136, 144.9631]}  // Default center (Melbourne)
          zoom={13}  // Default zoom level    
          scrollWheelZoom={true}
          style={{ height: "100vh", width: "100%" }}
    >
    {/* Google Maps TileLayer */}
    <TileLayer
        attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
    />
    
    {/* OpenStreetMap TileLayer */}
    {/* <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    /> */}
          
    {/* FlyTo function */}
    <FlyToHandler target={selectedPin} />
    
    {/* Handle map clicks to add pins */}
    <MapClickHandler onAddPin={onAddPin} />
          
    {/* Render pins as markers */}
          {pins.map((pin, index) => {
              const isHovered = hoveredIndex === index;  // Check if this pin is currently hovered in the list
          
              return (
                <Marker
                      key={pin.id}
                      position={[pin.lat, pin.lng]}
                      icon={isHovered ? hoveredIcon : normalIcon}  // Use hovered icon if this pin is hovered in the list>
                      draggable={ true }  // Allow dragging the marker to update its position
                      eventHandlers={{      // Handle the drag end event to update the pin's position and fetch new address
                          dragend: async (e) => {
                              const marker = e.target;
                              const position = marker.getLatLng();

                              const newLat = position.lat;
                              const newLng = position.lng;

                              // Update the pin's position in the parent component
                              updatePin(pin.id, {
                                  lat: newLat,
                                  lng: newLng,
                                  loading: true,  // Set loading state while fetching new address
                              });

                              try {
                                  const address = await reverseGeocode(newLat, newLng);

                                  updatePin(pin.id, {
                                      address,
                                      loading: false,  // Clear loading state after fetching address
                                  });
                              } catch (err) {
                                  console.error(err);
                              }
                            },
                      }}
                >
                
                    {/* Show tooltip when hovered in the list */}
                    {hoveredIndex === index && (
                        <Tooltip
                            direction="auto"
                            offset={[10, -25]}
                            opacity={1}
                            permanent
                            className="custom-tooltip"  // Custom class for styling
                        >
                            { /* Change Tooltip styles */}
                            <style>{` 
                            .leaflet-tooltip.custom-tooltip {
                                background-color: transparent !important;
                                border: none !important;
                                box-shadow: none !important;
                                padding: 0 !important;
                            }
                            .leaflet-tooltip-top.custom-tooltip::before {
                                display: none !important;   // Remove default tooltip arrow
                            }
                            
                        `}</style>

                            <div className="
                            bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 flex flex-col gap-0.5 w-52
                            max-w-xs break-words whitespace-normal
                        ">
                                <div className="text-lg font-bold text-gray-800">
                                    Pin #{index + 1}
                                </div>
                                <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                                
                                    {/* Display DMS(Degree, Minutes, Second) */}
                                    {/* 📍 {formatToDMS(pin.lat, pin.lng)} */}

                                    {/* Display Real Address */}
                                    📍 {pin.loading
                                        ? "Loading address..."
                                        : pin.address || formatToDMS(pin.lat, pin.lng)}
                                </div>
                            </div>
                        </Tooltip>
                    )}
                </Marker>
          )})}
          
    </MapContainer>
  );
}

export default MapView;