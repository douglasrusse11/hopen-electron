import Amplify from "aws-amplify";
import { API } from 'aws-amplify';
// import { Typography, AppBar, Card, CardAcions, CardContent, CardMedia, CssBaseline, Grid, Container, Toolbar, Button, Form } from '@material-ui/core'
// import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import {Container, Button, Form} from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';


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

  const {t, i18n} = useTranslation();


  return (
    <Container>
    <div>
      <h3>{t('contact.intro')}</h3>
      <br/>
        <Form>
          <Form.Group>
            <Form.Label>{t('contact.name')}</Form.Label>
            <Form.Control placeholder={t('contact.name')} onChange={e => updateFormState('name', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('contact.email')}</Form.Label>
            <Form.Control placeholder={t('contact.email')} onChange={e => updateFormState('email', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('contact.message')}</Form.Label>
            <Form.Control placeholder={t('contact.message')} onChange={e => updateFormState('message', e.target.value)} />
          </Form.Group>
          <Button onClick={addContact}>{t('contact.send')}</Button>
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