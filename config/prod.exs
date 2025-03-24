import Config

# Configures Swoosh API Client
config :swoosh, api_client: Swoosh.ApiClient.Finch, finch_name: PhoenixNextjs.Finch

# Disable Swoosh Local Memory Storage
config :swoosh, local: false

# Do not print debug messages in production
config :logger, level: :info

# Add signing_salt configuration for session cookies
config :phoenix_nextjs, :signing_salt, System.get_env("SIGNING_SALT")

# Runtime production configuration, including reading
# of environment variables, is done on config/runtime.exs.
