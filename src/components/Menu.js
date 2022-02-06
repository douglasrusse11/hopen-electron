import { Link } from 'react-router-dom';

const Menu = () => {

    return (
        <div style={menuStyle}>
            <Link style={{textDecoration: "none", color: "black"}} to="/resources/bycategory/Accomodation">
                <h3>Resources</h3>
            </Link>
        </div>
    )

}

const menuStyle = {
    height: "100%",
    width: "100px",
}

export default Menu;