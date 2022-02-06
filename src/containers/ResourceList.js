import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';
import { useParams, Link } from 'react-router-dom';
import Map from '../components/Map';
import Form from '../components/Form';
import Nav from '../components/Nav';

const ResourceList = ({user, formData, setFormData, initialState, setDisplayUpdateForm, client}) => {
    const [resourceList, setResourceList] = useState([]);
    const [displayAddNew, setDisplayAddNew] = useState(true);
    let { category } = useParams();

    useEffect(() => {
        fetchResources();
        const subscription = DataStore.observe(Resource)
                                      .subscribe(() => fetchResources())
        return () => subscription.unsubscribe()
      }, [category]);

    const fetchResources = () => {
        DataStore.query(Resource, r => r.category("eq", category))
            .then(data => setResourceList(data))
    }

    const displayResources = () => {
        return resourceList.map(resource => (
            <div key={resource.id}>
            <div style={styles.resource}>
                <Link to={`/resources/${resource.id}`} style={{textDecoration: 'none'}}>
                    <div>
                    <h3 style={styles.heading}>{resource.name}</h3>
                    <h4 style={styles.heading}>{resource.category}</h4>
                    <h5 style={styles.heading}>{resource.address}</h5>
                    </div>
                </Link>
                <div>
                {/* { user && user.isAdmin && (
                    <>
                        <button style={styles.button} onClick={() => { setFormData({name: resource.name, category: resource.category, address: resource.address, latlng: resource.latlng}); setDisplayAddNew(true); setDisplayUpdateForm({id: resource.id, display: true})}}>Update</button>
                        <button style={styles.button} onClick={() => deleteRestaurant(resource.id)}>Delete</button>
                    </>
                )} */}
                </div>
            </div>
                {/* {
                    resource.id === displayUpdateForm.id && displayUpdateForm.display === true && (
                        <Form onSubmit={() => updateRestaurant(resource.id)} formData={formData} setFormData={setFormData} />
                    )
                } */}
          </div>  
        ))
    }

    const displayForm = (style) => {
        return (
            <div style={styles.container}>
                {user && user.isAdmin && (displayAddNew ? <button onClick={() => {setFormData(initialState); setDisplayAddNew(false)}}>Add new</button> : <Form onSubmit={createResource} formData={{...formData, category: category}} setFormData={setFormData} client={client} />)}
            </div>
        )
    }

    const createResource = async () => {
            if (!formData.name) return
            try {
                await DataStore.save(new Resource({ ...formData }));
                setFormData(initialState);
                setDisplayAddNew(true);
            } catch (err) {
                console.log("Create error: ", err);
            }
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Nav />
            <div style={{display: "flex"}}>
                {resourceList.length !== 0 && <Map resources={resourceList} userCoords={null} route={null} />}
                <div style={styles.resources} >
                    {(resourceList && resourceList.length !== 0) ? displayResources() : <h3>No resources to display for {category}.</h3>}
                    {displayForm()}
                </div>
            </div>
        </div>
    )
}

const styles = {
    resource: {
        margin: 0,
        marginBottom: 10,
        paddingLeft: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    resources: {
        display: "flex",
        flexDirection: "column"
    },
    heading: {
        margin: 0,
        color: 'black'
    },
    button: {
        height: 20
    }

}

export default ResourceList;