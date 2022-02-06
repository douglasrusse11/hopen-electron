import { Link } from 'react-router-dom';
import { ResourceType } from '../models';

const Nav = () => {

    const categoryMap = {
        Accomodation: <><span className="material-icons">house</span>Accomodation</>,
        Food: <><img src="/foodicon.svg" width="24px" />Food</>,
        Clothing: <><img src="/clothingicon.png" width="24px" />Clothing</>,
        Health: <><span className="material-icons">medical_services</span>Health Services</>,
        Sport: <><span className="material-icons">sports_soccer</span>Sport Activities</>,
        Legal: <><img src="/legalicon.png" width="24px" />Legal Services</>,
        Education: <><span className="material-icons">school</span>Education</>
    }

    return (
        <div style={navStyle}>
        { (
            Object.values(ResourceType).map((category, index) => (
                <Link style={linkStyle} key={`category_${index}`} to={`/resources/bycategory/${category}`}>
                <h3 style={headerStyle}>{categoryMap[category]}</h3>
                </Link>
        )))}
        </div>
    )

}

const navStyle = {
    display: 'flex',
};
const linkStyle = {
    textDecoration: 'none'
}
const headerStyle = {
    fontSize: 24,
    margin: 0,
    marginLeft: 10,
    color: 'black',
    alignText: 'center'
};

export default Nav;