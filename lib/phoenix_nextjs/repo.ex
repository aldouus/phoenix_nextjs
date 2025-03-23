defmodule PhoenixNextjs.Repo do
  use Ecto.Repo,
    otp_app: :phoenix_nextjs,
    adapter: Ecto.Adapters.Postgres
end
