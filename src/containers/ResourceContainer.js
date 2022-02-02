import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';
import ResourceDetail from '../components/ResourceDetail';
import Map from '../components/Map';

const ResourceContainer = ({user, formData, setFormData, deleteResource}) => {
    const [resource, setResource] = useState(null);
    const [displayUpdateForm, setDisplayUpdateForm] = useState(false)
    let { id } = useParams();

    useEffect(() => {
        DataStore.query(Resource, id)
            .then(res => setResource(res))
    }, [])

    const updateResource = async (id) => {
        const resource = await DataStore.query(resource, id);
        await DataStore.save(resource.copyOf(resource, updated => {
            updated.category = formData.category;
            updated.name = formData.name;
            updated.address = formData.address;
            updated.description = formData.description;
            updated.phoneNumber = formData.phoneNumber;
            updated.emailAddress = formData.emailAddress;
            updated.openingHours = formData.openingHours;
            updated.latlng = formData.latlng;
        }))
        setDisplayUpdateForm({id: 0, display: false});
    }

    return (
        <>
        { resource && (
            <>
                <Map resource={resource} />
                <ResourceDetail resource={resource} user={user} setFormData={setFormData} setDisplayUpdateForm={setDisplayUpdateForm} deleteResource={deleteResource}  />
            </>
        )}
        </>
    )

}

export default ResourceContainer;