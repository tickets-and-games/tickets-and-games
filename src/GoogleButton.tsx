import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

interface Props {
  setUserId: (userId: string) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Login(props: Props) {
  const googleLogin = (
    googleUser: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    fetch("/api/login/oauth", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      mode: "no-cors",
      body: JSON.stringify({ googleUser: googleUser }),
    });
  };

  return (
    <div className="LoginBox">
      <div className="Login">
        <h1>Login to continue</h1>
        <GoogleLogin
          clientId="318870608375-efi0el1rcp01sjik3iterm017i06tm9j.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(
            googleUser: GoogleLoginResponse | GoogleLoginResponseOffline
          ) => {
            googleLogin(googleUser);
          }}
          cookiePolicy="single_host_origin"
          isSignedIn
        />
      </div>
    </div>
  );
}
