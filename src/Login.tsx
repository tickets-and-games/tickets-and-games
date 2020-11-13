import React from 'react';
import { GoogleLogin } from 'react-google-login';

function googleLogin(googleUser: any) {
  fetch('/api/login/oauth', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    mode: 'no-cors',
    body: JSON.stringify({ token: googleUser?.tokenId }),
  });
}

export default function Login() {
  return (
    <div className="LoginBox">
      <div className="Login">
        <h1>Login to continue</h1>
        <GoogleLogin
          clientId="154638215001-5tdj4ttljsh2c3m5uojmq7nrruock21s.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={googleLogin}
          cookiePolicy="single_host_origin"
          isSignedIn
        />
      </div>
    </div>
  );
}
