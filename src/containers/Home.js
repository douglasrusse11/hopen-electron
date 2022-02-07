import athens from './athens.jpg'

const Home = () => {

    return (
        <div style={styles.container}>
            <h2 style={styles.homeHeader}>Welcome to HopeN</h2>
            <p style={styles.homeText}>Thank you for visiting us! If you're looking for information on topics like asylum procedures, work permissions, registering children for school, or finding a doctor, you're in the right place. Our project aims to help refugees in Greece access services and exercise their rights.</p>
            <img src={athens} alt="Athens" style={styles.image}/>
        </div>
    )
}

const styles = {
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '8vh',
    },
    homeHeader: {
        fontSize: 40,
        color: '#0F1626'
    },
    homeText: {
        fontSize: 30,
        color: '#0F1626'
    },
    image: {
        height: '40vh',
        width: 'auto'
    }
}

export default Home;