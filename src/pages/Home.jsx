import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function Home() {
  const [isVerified, setisverified] = useState(false);
  useEffect(() => {
    const verifyUser = async () => {
      axios.get("http://localhost:8000/protected", {
        withCredentials: true
      })
        .then(res => {
          console.log(res.data); // Handle success
          return;
        })
        .catch(err => {
          console.error(err); // Handle error
          return;
        });
    }
    verifyUser();
  }, [])
  return (
    <div>
      home
    </div>
  )
}
