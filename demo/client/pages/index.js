import Partybutton from 'partybutton-react';
import { useState } from 'react'
export default function App() {
  const [session, setSession] = useState(null)
  const onSession = (val) => {
    setSession(val)
  }
  return (
    <>
      <Partybutton
        role="user"
        onSession={onSession}
        walletconnect="767750972a99441ea5d276ed16d7eef0"
      />
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}
