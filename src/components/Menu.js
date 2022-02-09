import { Link } from 'react-router-dom';


const Menu = ({user}) => {

    return (
        <div style={menuStyle}>
            <Link style={{textDecoration: "none", color: "whitesmoke"}} to="/resources/bycategory/Accomodation">
                <h3>Resources</h3>
            </Link>
            <Link style={{textDecoration: "none", color: "whitesmoke"}} to="/contact">
                <h3>Contact</h3>
            </Link>
            <Link style={{textDecoration: "none", color: "whitesmoke"}} to="/news">
                <h3>News</h3>
            </Link>
            { user && user.isAdmin && 
                <Link style={{textDecoration: "none", color: "whitesmoke"}} to="/seeder">
                    <h3>Seed DB</h3>
                </Link>
            }
        </div>
    )

}

const menuStyle = {
    height: "100%",
    width: "100px",
    backgroundColor: "#29648a",
}

export default Menu;