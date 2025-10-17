/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // keep your existing settings…
    qualities: [75, 85, 95], // include 95 since you use it
  },
};
export default nextConfig;
