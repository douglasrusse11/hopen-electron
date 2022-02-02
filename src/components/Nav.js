import { Link } from 'react-router-dom';
import { ResourceType } from '../models';

const Nav = () => {

    return (
        <div style={navStyle}>
        { (
            Object.values(ResourceType).map((style, index) => (
                <Link style={linkStyle} key={`style_${index}`} to={`/resources/bycategory/${style}`}>
                    <h3 style={headerStyle}>{style}</h3>
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
    color: 'black'
};

export default Nav;