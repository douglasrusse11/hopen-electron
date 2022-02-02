import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';
import ResourceDetail from '../components/ResourceDetail';

const ResourceContainer = () => {
    const [resource, setResource] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        DataStore.query(Resource, id)
            .then(res => setResource(res))
    }, [])

    return (
        <ResourceDetail resource={resource} />
    )

}

export default ResourceContainer;