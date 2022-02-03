import {useState} from 'react';
import {DataStore, Predicates} from '@aws-amplify/datastore';
import {Resource} from '../models';
import {withAuthenticator} from '@aws-amplify/ui-react';

const Seeder = ({client}) => {

    const [data, setData] = useState(null)

    const onChange = (e) => {
        setData(e.target.value);
    }

    const processData = async () => {
        if (!data) return;
        await DataStore.delete(Resource, Predicates.ALL);
        const splitData = data.split('\n');
        const resources = [];
        for (let i=1; i < splitData.length; i++) {
            let [category, name, address, phoneNumber, emailAddress, openingHours, description] = splitData[i].split('\t');
            if (category.split(' ').length > 1) {
                category = category.split(' ')[0];
            }
            const resource = {
                category: category,
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress,
                openingHours: openingHours,
                description: description
            };
            resources.push(resource);
        }
        resources.forEach(async resource => {
            await client.searchPlaceIndexForText({IndexName: "AthensIndex", Text: resource.address, FilterCountries: ["GRC"], MaxResults: '1'}, (err, data) => {
                if (err) console.error(err);
                if (data) {
                    resource.latlng = [data.Results[0].Place.Geometry.Point[1], data.Results[0].Place.Geometry.Point[0]];
                    DataStore.save(new Resource({...resource}))
                };
            })
        });
    }


    return (
        <>
            <textarea name="data" onChange={onChange} style={{width: 800, height: 600}} />
            <button onClick={processData}>Seed DB</button>
        </>
    )

}

export default withAuthenticator(Seeder);