export default {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'Ash Furrow', // Navigation and Site Title
  siteTitleAlt: 'Ash Furrow – Compassionate Software Developer', // Alternative Site title for SEO
  siteUrl: 'https://ashfurrow.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/assets/bg/default.jpg', // Your image for og:image tag. You can find it in the /static folder
  defaultBg: '/assets/bg/default.jpg', // default post background header
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Compassionate Software Developer', // Your site description
  author: 'Ash FUrrow', // Author for schemaORGJSONLD
  siteLogo: '/assets/siteimage.png', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@ashfurrow', // Twitter Username - Optional
  ogLanguage: 'en_CA', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#398CCC',
  backgroundColor: '#2b2e3c',

  // Settings for typography.ts
  headerFontFamily: 'Futura',
  bodyFontFamily: 'ff-tisa-web-pro',
  baseFontSize: '20px',

  //
  POST_PER_PAGE: 4
}
