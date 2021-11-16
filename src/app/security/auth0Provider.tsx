import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }: Props) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
  const history = useHistory();
  const redirectPath = '/dashboard';

  const onRedirectCallback = (appState: any) => {
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