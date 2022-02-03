import { useState } from 'react';
import { ResourceType } from '../models';

const Form = ({onSubmit, formData, setFormData, client}) => {

    const [addressList, setAddressList] = useState([])
    const [lastRequest, setLastRequest] = useState(Date.now());

    const onChange = (e) => {
        if (e.target.name === 'lat') {
            setFormData({
                ...formData, latlng: [parseFloat(e.target.value), formData.latlng[1]]
            })
        } else if (e.target.name === 'lng') {
            setFormData({
                ...formData, latlng: [formData.latlng[0], parseFloat(e.target.value)]
            })
        } else if (e.target.name === 'address') {
            if (e.target.value && (Date.now() - lastRequest > 500)) {
                    // fetch(`https://nominatim.openstreetmap.org/?q=${e.target.value}&format=json&limit=10&addressdetails=1&countrycodes=gr`)
                    //     .then(res => res.json())
                    //     .then(data => setAddressList(data));
                    client.searchPlaceIndexForText({IndexName: "AthensIndex", Text: e.target.value, FilterCountries: ["GRC"], MaxResults: '10'}, (err, data) => {
                        if (err) console.error(err);
                        if (data) {
                            setAddressList(data.Results)
                        };
                    })
                    setLastRequest(Date.now());
                }
            if (addressList.length !== 0) {
                setFormData({
                    // ...formData, [e.target.name]: e.target.value
                    ...formData, [e.target.name]: e.target.value, latlng: [parseFloat(addressList[0].Place.Geometry.Point[1]), parseFloat(addressList[0].Place.Geometry.Point[0])]
                })
            } else {
                setFormData({
                    ...formData, [e.target.name]: e.target.value
                })
            } 
        } else {
            setFormData({
                ...formData, [e.target.name]: e.target.value
            })
        }
    }

    return (
        <>
            <select name="category" onChange={onChange} defaultValue={formData.category} >
                    { Object.values(ResourceType).map((resourceType, index) => (
                            <option key={`resourceOption_${index}`} value={resourceType} >{resourceType}</option>
                    ))}
            </select>
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={onChange} />
            <input type="search" placeholder="Address" name="address" list="addresses" value={formData.address} onChange={onChange} autoComplete="true"/>
            <datalist id="addresses">
                { addressList.map((address, index) => (
                    <option value={address.Place.Label} key={`address_${index}`}  />
                ))}
            </datalist>
            <input type="text" placeholder="Description" name="description" value={formData.description} onChange={onChange} />
            <input type="text" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={onChange} />
            <input type="text" placeholder="Email Address" name="emailAddress" value={formData.emailAddress} onChange={onChange} />
            <input type="text" placeholder="Opening Hours" name="openingHours" value={formData.openingHours} onChange={onChange} />
            <input type="number" placeholder="Latitude" name="lat" value={formData.latlng[0]} step="0.00001" onChange={onChange} />
            <input type="number" placeholder="Longitude" name="lng" value={formData.latlng[1]} step="0.00001" onChange={onChange} />
            <button onClick={onSubmit}>Submit</button>
        </>
    )
}

export default Form;