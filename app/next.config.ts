import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import path from "node:path";

// load .env from the root directory
const projectDir = path.resolve(process.cwd(), "..");
loadEnvConfig(projectDir);

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
