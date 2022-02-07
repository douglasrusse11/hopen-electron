import { Link } from 'react-router-dom';
import { ResourceType } from '../models';

const Nav = () => {

    const categoryMap = {
        Accomodation: <><span className="material-icons">house</span>  Accomodation</>,
        Food: <><span className="material-icons">local_dining</span>  Food</>,
        Clothing: <><span className="material-icons">checkroom</span>   Clothing</>,
        Health: <><span className="material-icons">medical_services</span>  Health Services</>,
        Sport: <><span className="material-icons">sports_soccer</span>  Sport Activities</>,
        Legal: <><span className="material-icons">gavel</span>  Legal Services</>,
        Education: <><span className="material-icons">school</span>  Education</>
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
    width: "100%",
    backgroundColor: "#FF533D",
    padding: '1vh 0vh 1vh 0vh'
};
const linkStyle = {
    textDecoration: 'none'
}
const headerStyle = {
    fontSize: 24,
    margin: 0,
    marginLeft: 10,
    color: '#F5F5F5',
    alignText: 'center'
};

export default Nav;