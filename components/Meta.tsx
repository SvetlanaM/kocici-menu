import Head from 'next/head';


const Meta = (): JSX.Element => {
  return (
    <Head>
      <script 
        dangerouslySetInnerHTML={{
        __html: `
        var cpm = {
          cookie: {
            sameSite: 'Strict',
            secure: true
          }
        };
        (function(h,u,b){
        var d=h.getElementsByTagName("script")[0],e=h.createElement("script");
        e.async=true;e.src='https://cookiehub.net/c2/08ab8c3e.js';
        e.onload=function(){u.cookiehub.load(b);}
        d.parentNode.insertBefore(e,d);
        })(document,window,cpm);;
      `,
        }} 
      />
      <script 
        async 
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} 
      />
      <script 
        dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
        });
      `,
        }} 
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap"
        rel="stylesheet"
      />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta charSet="utf-8" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta property=" og:type" content="website" />
      <meta property="og:url" content="https://www.kocicimenu.cz/" />
      <meta
        property="og:title"
        content="Kočičí menu - jídelníček mé mlsné kočky"
        key="ogtitle"
      />
      <meta
        property="og:description"
        content="Potrava pro vaši kočku tvořená vaší kočkou. Výběr kvalitního krmiva a zároveň úspora financí, nebo přírody na (ne)vyhozeném jídle."
        key="ogdesc"
      />
      <meta
        property="og:image"
        content="https://catappreact.s3.eu-west-2.amazonaws.com/kocici-menu.png"
        key="ogimage"
      />
      <meta
        property="og:image-alt"
        content="Potrava pro vaši kočku tvořená vaší kočkou. Výběr kvalitního krmiva a zároveň úspora financí, nebo přírody na (ne)vyhozeném jídle."
      />
      <meta property="og:site_name" content="Kočičí menu" key="ogsitename" />
      <meta property="og:type" content="article" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.kocicimenu.cz/" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="https://www.kocicimenu.cz/" />
      <meta
        property="twitter:title"
        content="Kočičí menu - mlsný jídelníček mé kočky"
      />
      <meta
        property="twitter:description"
        content="Potrava pro vaši kočku tvořená vaší kočkou. Výběr kvalitního krmiva a zároveň úspora financí, nebo přírody na (ne)vyhozeném jídle."
      />
      <meta
        property="twitter:image"
        content="https://catappreact.s3.eu-west-2.amazonaws.com/kocici-menu.png"
      />

      <meta name="title" content="Kočičí menu - mlsný jídelníček mé kočky" />
      <meta
        name="description"
        content="Potrava pro vaši kočku tvořená vaší kočkou. Výběr kvalitního krmiva a zároveň úspora financí, nebo přírody na (ne)vyhozeném jídle."
      />
      <meta name="author" content="Kompilátor s. r. o." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta
        name="keywords"
        content="kočka, jídlo, kvalita, stravování, krmivo, zdravé, kočičí kapsičky, granule"
      />
      <meta name="application-name" content="Kočičí menu" />
      <link rel="canonical" href="https://kocicimenu.cz/" />
    </Head>
  );
};

export default Meta;
