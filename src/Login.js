import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import Button from 'react-bootstrap/Button';
import { AuthState } from '@aws-amplify/ui-components';

function Login(props) {
  
  Amplify.configure({
    Auth: {
      userPoolId: "us-east-2_PBwVc65b5",
      userPoolWebClientId: "4rsv0cf09641cb2vlf8lc3jh9u",
    }
  });

  return props.authState === AuthState.SignedIn && props.user ? (""):(
    <>
    <AmplifyAuthenticator style={{display:(props.show ? 'bloack':'none')}}>
      <Modal className="greymodal" show={props.show} onHide={props.showLogin}>
          <Modal.Header>
            <Button type="button" variant="warning" className="close" onClick={props.showLogin}>
              <span aria-hidden="true">x</span>
            </Button>
         </Modal.Header>
         <Modal.Body>
         <AmplifyAuthenticator>
          <AmplifySignIn
            headerText="Login to Continue"
            slot="sign-in"
          ></AmplifySignIn>
          <AmplifySignUp
            slot="sign-up"
            formFields={[
              {
                type: "name",
                label: "Name",
                placeholder: "Enter your name",
                required: true
              },
              {
                type: "given_name",
                label: "First Name *",
                placeholder: "Enter your first name",
                required: true
              },
              {
                type: "family_name",
                label: "Last Name",
                placeholder: "Enter your last name",
                required: false
              },
              { type: "username" },
              { type: "password" },
              { type: "email" },
              { type: "phone_number" }
            ]}
          />
          </AmplifyAuthenticator>  
         </Modal.Body>
      </Modal>
      </AmplifyAuthenticator>
    </>
  );
}

export default Login;