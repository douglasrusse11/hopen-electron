import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {DataStore} from '@aws-amplify/datastore';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Home from './Home';
import ResourceList from './ResourceList';
import ResourceContainer from './ResourceContainer';
import { Resource } from '../models';

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

    useEffect(() => {
        getUser()
        Hub.listen('auth', (data) => {
            const { payload: { event }} = data
            if (event === 'signIn' || event === 'signOut') getUser()
        })
    }, [])

    useEffect(() => {
        const subscription = DataStore.observe(Resource)
                                      .subscribe(() => fetchResources())
        return () => subscription.unsubscribe()
      }, []);

      
      const getUser = async () => {
          try {
              const data = await Auth.currentAuthenticatedUser();
              const userInfo = {username: data.username, isAdmin: data.signInUserSession.idToken.payload['cognito:groups'] && data.signInUserSession.idToken.payload['cognito:groups'].includes('Admin'), ...data.attributes};
              setUser(userInfo);
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
            </Routes>
        </BrowserRouter>
    )
}

export default Router;