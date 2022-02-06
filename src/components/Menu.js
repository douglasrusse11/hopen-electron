import { Link } from 'react-router-dom';

const Menu = ({user}) => {

    return (
        <div style={menuStyle}>
            <Link style={{textDecoration: "none", color: "black"}} to="/resources/bycategory/Accomodation">
                <h3>Resources</h3>
            </Link>
            { user && user.isAdmin && 
                <Link style={{textDecoration: "none", color: "black"}} to="/seeder">
                    <h3>Seed DB</h3>
                </Link>
            }
        </div>
    )

}

const menuStyle = {
    height: "100%",
    width: "100px",
}

export default Menu;