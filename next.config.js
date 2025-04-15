/** @type {import('next').NextConfig} */
// import { withNextVideo } from 'next-video/process'
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'vibeofsavibucket1.s3.eu-north-1.amazonaws.com',
            port: '', 
            pathname: '/**', 
          },
          {
            protocol: 'https',
            hostname: 'mysavibucket-main.s3.ap-south-1.amazonaws.com',
            port: '', 
            pathname: '/**', 
          }
        ],
      }
}
module.exports = nextConfig

