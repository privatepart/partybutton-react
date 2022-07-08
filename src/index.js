/***************************************************************************************
*
*   <Privateparty
*     role="user",                      // (required) the privateparty role to connect to
*     onSession={(session) => { }},     // (required) triggered when first initialized, and also whenever the session changes (logs in or logs out)
*     onError={(error) => { } },        // (optional) triggered when there's an error
*     login: {{
*       message: "connect with wallet", // (optional) login button message
*       style: {
*         backgroundColor: "red",
*         color: "white",
*         padding: "10px"
*       }
*     }},
*     logout: {{
*       message: "disconnect",          // (optional) logout button message
*       style: {
*         backgroundColor: "blue",
*         color: "white",
*         padding: "10px"
*       }
*     }},
*     host: "http://localhost:3000",    // (optional) the privateparty server host ONLY in case it's cross origin.
*     payload: { . . . },               // (optional) custom payload to pass to the privateparty server
*     walletconnect: <infuraId>
*   />
*
***************************************************************************************/
import { useEffect, useRef, useState } from 'react'
import Privateparty from 'privatepartyjs'
export default function Button (props) {
  const login = props.login ? props.login : { message: "login", style: {} }
  const logout = props.logout ? props.logout : { message: "logout", style: login.style }
  if (!logout.style) logout.style = login.style
  const host = props.host ? props.host : null
  const payload = props.payload ? props.payload: undefined
  const [session, setSession] = useState(null)
  const party = useRef({})
  const toggle = async () => {
    if (session) {
      try {
        let s = await party.current.disconnect(props.role)
        setSession(s)
      } catch (e) {
        if (props.onError) props.onError(e)
      }
    } else {
      try {
        let s = await party.current.connect(props.role, payload)
        setSession(s)
      } catch (e) {
        if (props.onError) props.onError(e)
      }
    }
  }
  useEffect(() => {
    (async () => {
      const config = {}
      if (host) config.host = host
      if (props.walletconnect) config.walletconnect = props.walletconnect
      party.current = new Privateparty(config)
      try {
        let s = await party.current.session(props.role)
        setSession(s)
      } catch (e) {
        if (props.onError) props.onError(e)
      }
    })();
  }, []);
  useEffect(() => {
    if (props.onSession) props.onSession(session)
  }, [session]);
  return (
    <button style={session ? logout.style : login.style} onClick={toggle}>{session ? logout.message : login.message}</button>
  );
}
