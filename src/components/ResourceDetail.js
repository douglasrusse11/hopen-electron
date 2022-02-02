const ResourceDetail = ({resource}) => {

    return (
        <div>
            <h3>{resource.name}</h3>
            <h4>{resource.category}</h4>
            <h5>{resource.address}</h5>
            <p>Phone Number: {resource.phoneNumber}</p>
            <p>Email Address: <a href={`mailto:${resource.emailAddress}`}>{resource.emailAddress}</a></p>
            <p>Opening Hours: {resource.openingHours}</p>
            <p>{resource.decription}</p>
        </div>
    )

}

export default ResourceDetail;