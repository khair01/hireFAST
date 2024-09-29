import React, { useEffect, useState } from 'react'

export default function Home() {
  const [isVerified, setisverified] = useState(false);
  useEffect(() => {
    const verifyUser = async () => {
      const res = await fetch("http://localhost:8000/protected", {
        method: 'GET',
        credentials: 'include' //to include cookies in request
      })
      if (!res.ok) {
        setisverified(false)
        return;
      }
      const result = await res.json();
      console.log(result.message);
      setisverified(true)

      return
    }
    verifyUser();
  }, [])
  return (
    <div>
      home
    </div>
  )
}
