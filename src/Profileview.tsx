import React, { useEffect } from 'react';

function Profileview() {
  useEffect(() => {
    // console.log(window.location.href); // TODO: parse to get user id
    const username = 'ak2253'; // TODO: get username from line 5
    const url = 'api/profileview/'.concat(username);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // TODO do stuff
      });
  }, []);
  return (
    <div className="Profile">
      TODO
    </div>
  );
}

export default Profileview;
