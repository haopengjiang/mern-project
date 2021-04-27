import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import FileUploadPage from './components/FileUploads/FileUploadPage';
import EditFileUpload from './components/FileUploads/EditFileUpload';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Account from './components/Account/Account';
import Profile from './components/Account/Profile';
import EditAccount from './components/Account/EditAccount';
import Footer from './components/Footer/Footer';


const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/account" exact component={Account} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/account/edit" exact component={EditAccount} />
        <Route path="/document" exact component={FileUploadPage} />
        <Route path="/document/edit/:id" component={EditFileUpload} />
      </Switch>
      <Footer />
    </Container>
  </BrowserRouter>
);

export default App;
