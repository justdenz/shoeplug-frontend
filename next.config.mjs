/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/shoe-plug/image/upload/*",
  },
};

export default nextConfig;
