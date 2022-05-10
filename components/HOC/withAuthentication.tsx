import Head from "next/head";
import { useEffect, useState } from "react";
import { getUserSession } from "../../auth/auth";
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
          <ComposedComponent {...props} userSession={userSession} />
        </>
      );
  };

  return withAuthentication;
};

export default withAuthentication;
