import Amplify from "aws-amplify";
import { API } from 'aws-amplify';
// import { Typography, AppBar, Card, CardAcions, CardContent, CardMedia, CssBaseline, Grid, Container, Toolbar, Button, Form } from '@material-ui/core'
// import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import {Container, Button, Form} from 'react-bootstrap';

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

async function addContact() {
  const data = {
    body: {
      name: formState.name,
      email: formState.email,
      message: formState.message
    }
  };

  console.log(data);
  const apiData = await API.post('formapp', '/contact', data);
  console.log({ apiData });
  alert('Mail sent');
}

const formState = { name: '', email: '', message: '' };

function updateFormState(key, value) {
  formState[key] = value;
}

const ContactForm = () => {
  return (
    <Container>
    <div>
      <h3>Get in touch</h3>
      <br/>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" onChange={e => updateFormState('name', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Email" onChange={e => updateFormState('email', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control placeholder="Message" onChange={e => updateFormState('message', e.target.value)} />
          </Form.Group>
          <Button onClick={addContact}>Send a message</Button>
        </Form>
      </div>
    </Container>
    // <>
    //   <CssBaseline />
    //   <AppBar position="relative">
    //     <Toolbar >
    //       <ConnectWithoutContactIcon />
    //         <Typography gutterBottom variant="h6">
    //           Get in touch
    //         </Typography>
    //     </Toolbar>
    //   </AppBar>
    //   <main>
    //     <div><

    //     >
    //   </main>
    // </>
   
  );
}

export default ContactForm;