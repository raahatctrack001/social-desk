/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images: {
      domains: [
        'www.shutterstock.com', 
        "images.unsplash.com", 
        "randomuser.me", 
        "static.vecteezy.com",
        "res.cloudinary.com",
      ],
    },
};

export default nextConfig;
