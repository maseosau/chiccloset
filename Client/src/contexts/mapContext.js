import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();
//21520766 -  Đặng Quốc Duy
export function MapProvider({ children }) {
    const [location, setLocation] = useState(null);
    return (
        <MapContext.Provider value={{
            location, setLocation
        }}>
            {children}
        </MapContext.Provider>
    );
}

export function useMap() {
    return useContext(MapContext);
}
