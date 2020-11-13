import React, { useState } from 'react';

function Signup() {
  const [params, setParams] = useState({
    name: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  function SigningUp() {
    fetch('/api/login/password', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      mode: 'no-cors',
      // Do stuff
    });
  }
  function handleParams(event) {
    const { value } = event.target.value;
    setParams({
      ...params,
      [event.target.name]: value,
    });
  }
  return (
    <form className="signup-form" onSubmit={SigningUp}>
      <div className="form-label">Name</div>
      <input
        type="text"
        name="name"
        className="signup-name"
        value={params.name}
        onChange={handleParams}
      />
      <div className="form-label">Username</div>
      <input
        type="text"
        name="username"
        className="signup-username"
        value={params.username}
        onChange={handleParams}
      />
      <div className="form-label">Email</div>
      <input
        type="text"
        name="email"
        className="signup-email"
        value={params.email}
        onChange={handleParams}
      />
      <div className="form-label">Password</div>
      <input
        type="text"
        name="passsword1"
        className="signup-password"
        value={params.password1}
        onChange={handleParams}
      />
      <div className="form-label">Enter Password Again</div>
      <input
        type="text"
        name="password2"
        className="signup-password"
        value={params.password2}
        onChange={handleParams}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Signup;
