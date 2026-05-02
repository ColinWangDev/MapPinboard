import type { Pin } from "../App";
import { formatToDMS } from "../utils/formatToDMS";

function PinList({
    pins,
    onDeletePin,
    onHover,
    onClearPins,
    onSelect,
}: {
    pins: Pin[];
    onDeletePin: (id: string) => void;
    onHover: (index: number | null) => void;
    onClearPins: () => void;
    onSelect: (pin: Pin) => void;
}) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4 cursor-pointer">
                { /* Pin List Header */ }
                <h2 className="text-xl font-bold mb-4">Pin List</h2>

                { /* Clear All Button, only visible when there are pins in the list */}
                {pins.length > 0 && (
                    <button
                        onClick={onClearPins}
                        className="text-sm text-red-500 font-semibold hover:bg-red-50 px-2 py-1 rounded transition duration-200 cursor-pointer"
                    >
                        Clear All
                    </button>
                )}
            </div>

            { /* Pin List Items */}
            <div className="space-y-3">
                {/* If no pins, show a placeholder message */} 
                {pins.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No pins added yet. Click on the map to add a pin!
                    </p>
                ) : (
                    pins.map((pin, index) => (
                        <div
                            key={pin.id}
                            onMouseEnter={() => onHover(index)}
                            onMouseLeave={() => onHover(null)}
                            onClick={() => onSelect(pin)}
                            className="flex items-center justify-between p-3 border rounded-lg"
                        >
                            { /* Pin Number */}
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                                #{index + 1}
                            </div>

                            { /* Pin Coordinates */}
                            <div className="flex-1 ml-4">
                                <div className="font-semibold">
                                    Pin #{ index + 1 }
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                    {/* Display DMS(Degree, Minutes, Second) */}
                                    {/* 📍 {formatToDMS(pin.lat, pin.lng)} */}

                                    {/* Display Real Address */}
                                    📍 {pin.loading
                                        ? "Loading address..."
                                        : pin.address || formatToDMS(pin.lat, pin.lng)}
                                </div>
                            </div>
                            
                            { /* Delete Button */}
                            <button
                                onClick={() => onDeletePin(pin.id)}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-red-500 hover:bg-red-50 cursor-pointer">
                                🗑
                            </button>
                        </div>
                )))}

            </div>
        </div>
  );
}

export default PinList;