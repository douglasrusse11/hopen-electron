import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';
import ResourceDetail from '../components/ResourceDetail';
import Map from '../components/Map';
import Form from '../components/Form';

const ResourceContainer = ({user, formData, setFormData, deleteResource}) => {
    const [resource, setResource] = useState(null);
    const [displayUpdateForm, setDisplayUpdateForm] = useState(false)
    let { id } = useParams();

    useEffect(() => {
        DataStore.query(Resource, id)
            .then(res => setResource(res))
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

    return (
        <>
        { resource && (
            <>
                <Map resource={resource} />
                { displayUpdateForm ?
                    <Form formData={formData} setFormData={setFormData} onSubmit={() => updateResource(resource.id)} /> :
                    <ResourceDetail resource={resource} user={user} setFormData={setFormData} setDisplayUpdateForm={setDisplayUpdateForm} deleteResource={deleteResource}  />
                }
            </>
        )}
        </>
    )

}

export default ResourceContainer;