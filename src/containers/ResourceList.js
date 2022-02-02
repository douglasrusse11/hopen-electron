import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';
import { useParams } from 'react-router-dom';

const ResourceList = () => {
    const [resourceList, setResourceList] = useState(null);
    let { category } = useParams();

    useEffect(() => {
        console.log(category)
        fetchResources();
        const subscription = DataStore.observe(Resource)
                                      .subscribe(() => fetchResources())
        return () => subscription.unsubscribe()
      }, []);

    const fetchResources = () => {
        DataStore.query(Resource, r => r.category("eq", category))
            .then(data => setResourceList(data))
    }

    return <h3>{category}</h3>
}

export default ResourceList;