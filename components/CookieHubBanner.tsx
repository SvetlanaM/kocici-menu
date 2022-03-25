import React from 'react'
import Helmet from 'react-helmet'

const CookieHubBanner = ({ cookieHubId }) => {
  const cookieHubUrl = 'https://cookiehub.net/c2/' + cookieHubId + '.js'
  return (
    <Helmet
      script={[
        {
          type: 'text/javascript',
          innerHTML: `var cpm = {
              cookie: {
                sameSite: 'Strict',
                secure: true
              }
            };
            (function(h,u,b){
            var d=h.getElementsByTagName("script")[0],e=h.createElement("script");
            e.async=true;e.src='${cookieHubUrl}';
            e.onload=function(){u.cookiehub.load(b);}
            d.parentNode.insertBefore(e,d);
            })(document,window,cpm);`,
        },
      ]}
    />
  )
}

export default CookieHubBanner
