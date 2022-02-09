import React from 'react';
import Router from './containers/Router';
import { getBitcoinArticles } from'./containers/NewsAPI'; 
import { Container} from '@material-ui/core';
import Articles from './components/Articles'

function App() {
  return (
      <Router />
  );
}

export default App;
