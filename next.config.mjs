/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'avatars.githubusercontent.com',
        pathname:"/**",
      },
      {
        protocol:'https',
        hostname:'lh3.googleusercontent.com',
        pathname:"/a/**",
      },
      {
        protocol:'https',
        hostname:'res.cloudinary.com',
      },
    ]
  }
};

export default nextConfig;
