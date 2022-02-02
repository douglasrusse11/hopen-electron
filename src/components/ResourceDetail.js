const ResourceDetail = ({resource, user, formData, setFormData, displayUpdateForm, setDisplayUpdateForm, deleteResource}) => {

    return (
        <div>
            <div>
                <h3>{resource.name}</h3>
                <h4>{resource.category}</h4>
                <h5>{resource.address}</h5>
                <p>Phone Number: {resource.phoneNumber}</p>
                <p>Email Address: <a href={`mailto:${resource.emailAddress}`}>{resource.emailAddress}</a></p>
                <p>Opening Hours: {resource.openingHours}</p>
                <p>{resource.decription}</p>
            </div>
            <div>
            { user && user.isAdmin && (
                    <>
                        <button style={{height: 20}} onClick={() => { setFormData({category: resource.category, name: resource.name, address: resource.address, description: resource.description, phoneNumber: resource.phoneNumber, emailAddress: resource.emailAddress, openingHours: resource.openingHours, latlng: resource.latlng}); setDisplayUpdateForm({id: resource.id, display: true})}}>Update</button>
                        <button style={{height: 20}} onClick={() => deleteResource(resource.id)}>Delete</button>
                    </>
                )}
            </div>
        </div>
    )

}

export default ResourceDetail;