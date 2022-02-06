import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { useState, useEffect } from 'react';

const Map = ({resources, userCoords, route}) => {

    const [mapOptions, setMapOptions] = useState(null)

    useEffect(() => {
        if (resources.length === 1) {
            if (!userCoords) {
                setMapOptions({
                    center: resources[0].latlng, 
                    bounds: [resources[0].latlng.map(r => r-0.001), resources[0].latlng.map(r => r+0.001)],
                    style: { height: "300px", width: "100%"}
                })
            } else {
                const center = resources[0].latlng.map((r,i) => (r+userCoords[i])/2);
                const lats = [resources[0].latlng[0], userCoords[0]].sort();
                const lngs = [resources[0].latlng[1], userCoords[1]].sort();
                setMapOptions({
                    center: center,
                    bounds: [[lats[0]-0.001, lngs[0]-0.001], [lats[1]+0.001, lngs[1]+0.001]],
                    style: { height: "300px", width: "100%"}
                })
            }
        }

    }, [userCoords])


    return (
        <>
        { mapOptions && (
        <MapContainer center={mapOptions.center} bounds={mapOptions.bounds} style={mapOptions.style}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { resources.map(resource => (
                <Marker position={resource.latlng}>
                    <Popup>
                        {resource.name} <br/>
                        {resource.category} <br/>
                        {resource.address}
                    </Popup>
                </Marker>
                )
            )}
            { userCoords && <Marker position={userCoords} />}
            {route && <Polyline positions={route} />}
            <UpdateMap mapOptions={mapOptions} />
        </MapContainer>
        )}
        </>
    );
}

function UpdateMap({ mapOptions }) {
        const map = useMap();
        map.setView(mapOptions.center);
        map.fitBounds(mapOptions.bounds);
        return null;
    }

export default Map;