export async function reverseGeocode(lat: number, lng: number) { 
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    const res = await fetch(url, {
        headers: {
            'User-Agent': 'map-pinboard-app',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to reverse geocode');
    }

    const data = await res.json();

    return data.display_name as string || 'Unknown Location';

}