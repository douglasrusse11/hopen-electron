import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Auth, Hub} from 'aws-amplify';
import Location from 'aws-sdk/clients/location';
import {DataStore} from '@aws-amplify/datastore';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Home from './Home';
import ResourceList from './ResourceList';
import ResourceContainer from './ResourceContainer';
import Seeder from './Seeder';
import { Resource } from '../models';
import config from '../aws-exports';

const initialState = {
    category: '',
    name: '',
    address: '',
    description: '',
    phoneNumber: '',
    emailAddress: '',
    openingHours: '',
    latlng: [0, 0]
};

const Router = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState(initialState);
    const [client, setClient] = useState(null);

    useEffect(() => {
        getUser()
        Hub.listen('auth', (data) => {
            const { payload: { event }} = data
            if (event === 'signIn' || event === 'signOut') getUser()
        })
    }, [])
      
    const getUser = async () => {
        try {
            const data = await Auth.currentAuthenticatedUser();
            const userInfo = {username: data.username, isAdmin: data.signInUserSession.idToken.payload['cognito:groups'] && data.signInUserSession.idToken.payload['cognito:groups'].includes('Admin'), ...data.attributes};
            setUser(userInfo);
            const credentials = await Auth.currentCredentials();
            console.log(credentials)
            console.log(config.aws_project_region)
            const c = new Location({
                credentials,
                region: config.aws_project_region,
            });
            setClient(c);
        } catch (err) {
            setUser(null);
            console.log('error: ', err);
        }
    }
        
        const fetchResources = () => {
            DataStore.query(Resource)
        }

    return (
        <BrowserRouter >
            <Header user={user} />
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resources/bycategory/:category" element={<ResourceList user={user} formData={formData} setFormData={setFormData} initialState={initialState} />} />
                <Route path="/resources/:id" element={<ResourceContainer user={user} formData={formData} setFormData={setFormData} />} />
                <Route path="/seeder" element={<Seeder client={client}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;