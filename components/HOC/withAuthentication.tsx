import Head from "next/head";
import { useEffect, useState } from "react";
import { getUserSession, userLogout } from "../../auth/auth";
import { loginType } from "../../interface/session";

const withAuthentication = (ComposedComponent: any, title: string) => {
    const withAuthentication = (props: any) => {
      const [userSession, setUserSession] = useState({} as loginType);

  useEffect(() => {
    getSession();
  }, [])

  const getSession = () => {
    let data = getUserSession();
    if (data && data.email) {
      setUserSession(data)
    } else {
            alert("You need to login");
            window.location.href = "/login"
        }
  }

      return (
        <>
          <Head> <title>Dummy Docs - {title}</title> </Head>
          <nav style={{ borderBottom: "1px solid black", padding: "0px 40px", display: "flex",width:"100%", justifyContent: "space-between" }} >
          <h1>Documents</h1>
          {userSession && userSession.email && <div style={{ display: "flex", alignItems:"center" }} >
            <div style={{ paddingRight: "10px" }} >{userSession.email}</div>
            <a style={{ cursor: "pointer", textDecoration:"underline" }} onClick={() => userLogout()} >Logout</a>
          </div>}
          </nav>
          
          <ComposedComponent {...props} userSession={userSession} />
        </>
      );
  };

  return withAuthentication;
};

export default withAuthentication;
