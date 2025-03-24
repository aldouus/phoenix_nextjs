import Config

# For development, we disable any cache and enable
# debugging and code reloading.
config :phoenix_nextjs, dev_routes: true

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime

# Disable swoosh api client as it is only required for production adapters.
config :swoosh, :api_client, false

# Watcher for Next.js development server
config :phoenix_nextjs, PhoenixNextjsWeb.Endpoint,
  watchers: [
    sh: ["-c", "cd app && pnpm dev"]
  ]
