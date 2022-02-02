import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({resource}) => {

    const style = {
        height: "300px",
        width: "100%"
    };



    return (
        <MapContainer center={resource.latlng} zoom={15} scrollWheelZoom={false} style={style}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={resource.latlng}>
                <Popup>
                    {resource.name} <br/>
                    {resource.style} <br/>
                    {resource.address}
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;