/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'firebasestorage.googleapis.com',
    //         port: '',
    //         pathname: '/v0/b/internship-cb833.appspot.com**',
    //       },
    //     ],
    //   },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true,
        },
      ]
    },
  };
  
  export default nextConfig;