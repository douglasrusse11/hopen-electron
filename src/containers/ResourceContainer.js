import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';

const ResourceContainer = () => {
    const [resource, setResource] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        DataStore.query(Resource, id)
            .then(res => setResource(res))
    }, [])

    return <h3>Resource goes here</h3>

}

export default ResourceContainer;