import MapView from "./components/MapView";
import PinList from "./components/PinList";
import { useState, useEffect } from "react";
import { reverseGeocode } from "./services/geocoding";


export type Pin = {
  id: string;  // Unique identifier for each pin
  lat: number;
  lng: number;
  address?: string;  // Optional address field for future use
  loading?: boolean;  // Optional loading state for reverse geocoding
};


function App() {
  const [pins, setPins] = useState<Pin[]>(() => {
    // Load pins from localStorage on initial render )
    const saved = localStorage.getItem("pins");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Save pins to localStorage whenever they change
  useEffect(() => {
    const cleanPins = pins.map(({loading, ...rest}) => rest);  // Remove loading state before saving
    localStorage.setItem("pins", JSON.stringify(cleanPins));
  }, [pins]);

  // Add a new pin to the list
  const addPin = async (pin: Pin) => {
    const id = Date.now().toString();  // Generate a unique ID based on timestamp
    const newPin: Pin = {
      ...pin,
      id,  // Generate a unique ID based on timestamp
      loading: true,  // Set loading state while fetching address
    };

    setPins((prevPins) => [...prevPins, newPin]);

    try {
      const address = await reverseGeocode(pin.lat, pin.lng);

      setPins((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, address, loading: false } : p
        )
      );
    } catch (error) {
      console.error(error);
    } 
  };

  // Update a pin's properties by ID (used for updating position and address after dragging)
  const updatePin = (id: string, updated: Partial<Pin>) => {
      setPins((prev) =>
          prev.map((p) =>
              p.id === id ? { ...p, ...updated } : p
          )
      );
  }; 

  // Delete a pin by index
  const deletePin = (index: number) => {
    setPins((prevPins) => prevPins.filter((_, i) => i !== index));
  };


  // Clear all pins from the list
  const clearPins = () => {
    setPins([]);
  };


  // Track which pin is currently hovered in the list (by index)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Related to Flyto functionality 
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  return (
    <div className="relative h-screen w-screen">
      { /* Map Layer, on bottom */}
      <MapView
        pins={pins}
        onAddPin={addPin}
        hoveredIndex={hoveredIndex}
        updatePin={updatePin}
        selectedPin={selectedPin}
      />

      { /* Pin List Layer, on top. Responsive layout. */}
      <div
        className="
          absolute
          z-[1000]

          /* Desktop &  Mobile-Landscape */
          md:top-4 md:left-4 md:bottom-4 md:w-[420px] md:h-auto 

          /* Mobile-Portrait */
          bottom-0 left-0 right-0 
          h-[40%]
        "
      >
        <div className="
          h-full bg-white/90 backdrop-blur-md shadow-lg p-4 overflow-y-auto
          
          /* Desktop & Mobile-Landscape*/
          md:rounded-xl

          /* Mobile-Potrait */
          rounded-t-2xl
          "
        >
          <PinList
            pins={pins}
            onDeletePin={deletePin}
            onHover={setHoveredIndex}
            onClearPins={clearPins}
            onSelect={ setSelectedPin}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
