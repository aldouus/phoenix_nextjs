import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
};

// shut down the server when phx.server is shut down
process.stdin.on("close", () => {
  process.exit(0);
});
process.stdin.resume();

export default nextConfig;
