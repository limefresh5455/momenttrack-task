import React, {useState} from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon
} from 'react-share';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Login from './Login';
import Button from 'react-bootstrap/Button';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

function App() {
  const shareUrl = 'http://github.com';
  const title = 'GitHub';
  const [show, setShow] = useState(false);
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [userEmail, setUserEmail] = useState();

  const showLogin = async () => {
    setShow(!show);
  }

  onAuthUIStateChange((nextAuthState, authData) => {
    setAuthState(nextAuthState);
    setUser(authData);
    Auth.currentSession()
    .then(data => {
      setUserEmail(data.idToken.payload.email);
    }).catch(err => console.log(err));
  });

  async function handleLogout() {
    try {
      Auth.signOut();
      setShow(false);
      setUserEmail('');
      console.log(authState);
      console.log(user);
      console.log(AuthState.SignedIn);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <Card className="sections">
            <Card.Header>Login With Amazon</Card.Header>
            <Card.Body>
              <Card.Title>Login with Amazon to see more detailed information.</Card.Title>
              {authState !== AuthState.SignedIn && !user ? (
                <Button type="button" variant="warning" onClick={showLogin}>
                  Login With Amazon
                </Button>
              ):(
                <><span>{userEmail}</span>
                <Button variant="warning" type="button" onClick={handleLogout}>
                  Logout
                </Button></>
              )}
              <Login
               show={show}
               showLogin={showLogin} authState={authState} user={user}/>
            </Card.Body>
          </Card>
          <Card className="sections">
            <Card.Header>Social Share</Card.Header>
            <Card.Body>
              <Card.Title>I love my product share on media to enter a contest to win more products.</Card.Title>
              <div className="some-network">
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  className="share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
              <div className="some-network">
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  className="share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
              <div className="some-network">
                <PinterestShareButton
                  url={String(window.location)}
                  media={`${String(window.location)}/${logo}`}
                  className="share-button"
                >
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
    </>
  );
}

export default App;
