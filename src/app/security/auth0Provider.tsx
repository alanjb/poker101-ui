import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { devEnvironment } from "../config/env";
import axios from "axios";

const Auth0ProviderWithHistory = ({ children } : Props) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
  const history = useHistory();
  const redirectPath = '/dashboard';

  const onRedirectCallback = (appState: any) => {
    // const { user } = useAuth0();

    //fist check if user exists
    // axios
    // .get(`http://localhost:8000/api/user/user`, { email: user?.email })
    // .then(res => {
    //   if(res.data){
    //     const { game } = res.data;
    //   }
    // })
    // .catch(error => {
    //   alert("Failed to create game \n\n" + error);
    // })



    history.push(appState.returnTo || window.location.pathname);

  };
  
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin + redirectPath}
      // audience={devEnvironment.apiUrl} //changes between dev vs prod
      scope="read:current_user update:current_user_metadata"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

type Props = {
  children: ReactNode;
}

export default Auth0ProviderWithHistory;