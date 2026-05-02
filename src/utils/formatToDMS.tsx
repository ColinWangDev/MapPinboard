{ /* Function to convert decimal degrees to DMS(Degree, Minutes, Seconds) format */ }
export const formatToDMS = (lat: number, lng: number) => {
    const format = (val: number, isLat: boolean) => {
        const abs = Math.abs(val);
        const deg = Math.floor(abs);
        const min = Math.floor((abs - deg) * 60);
        const sec = ((abs - deg) * 60 - min) * 60;
        const direction = isLat ? (val >= 0 ? "N" : "S") : (val >= 0 ? "E" : "W");
        return `${deg}°${min}'${sec.toFixed(2)}"${direction}`;
    };
    return `${format(lat, true)}, ${format(lng, false)}`;
};