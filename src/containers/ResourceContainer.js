import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';
import ResourceDetail from '../components/ResourceDetail';
import Map from '../components/Map';
import Form from '../components/Form';

const ResourceContainer = ({user, formData, setFormData, client}) => {
    const [resource, setResource] = useState(null);
    const [displayUpdateForm, setDisplayUpdateForm] = useState(false)
    const [userCoords, setUserCoords] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        DataStore.query(Resource, id)
            .then(res => setResource(res))
    }, [])

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
    
    function success(pos) {
        setUserCoords([pos.coords.latitude, pos.coords.longitude]);
    }
    
    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "granted") {
                  navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === "prompt") {
                  navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "denied") {
                }
              });
          }
    }, [])

    const updateResource = async (id) => {
        await DataStore.save(Resource.copyOf(resource, updated => {
            updated.category = formData.category;
            updated.name = formData.name;
            updated.address = formData.address;
            updated.description = formData.description;
            updated.phoneNumber = formData.phoneNumber;
            updated.emailAddress = formData.emailAddress;
            updated.openingHours = formData.openingHours;
            updated.latlng = formData.latlng;
        }))
        setDisplayUpdateForm(false);
        await DataStore.query(Resource, id)
            .then(res => setResource(res))
    }

    const deleteResource = async (id) => {
        await DataStore.delete(resource);
    }

    return (
        <>
        { resource && (
            <>
                {resource.latlng && <Map resource={resource} userCoords={userCoords} />}
                { displayUpdateForm ?
                    <Form formData={formData} setFormData={setFormData} onSubmit={() => updateResource(resource.id)} client={client} /> :
                    <ResourceDetail resource={resource} user={user} setFormData={setFormData} setDisplayUpdateForm={setDisplayUpdateForm} deleteResource={deleteResource}  />
                }
            </>
        )}
        </>
    )

}

export default ResourceContainer;