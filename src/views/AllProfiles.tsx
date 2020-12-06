import React, { useEffect, useState } from 'react';

interface ResponseType {
  name: string;
  username: string;
  registration_datetime: string;
  total_tickets: string;
}

export default function AllProfiles() {
  const [data, setData] = useState<ResponseType[]>([]);

  useEffect(() => {
    fetch('/api/profiles')
      .then((res) => res.json())
      .then((response) => {
        if (!response.error) {
          setData(response.profiles);
        }
      });
  }, []);
  return (
    <div>
      {data.map((profile) => (
        <>
          <div>{profile.name}</div>
          <div>{profile.username}</div>
          <div>{profile.registration_datetime}</div>
          <div>{profile.total_tickets}</div>
        </>
      ))}
    </div>
  );
}