defmodule PhoenixNextjsWeb.Router do
  use PhoenixNextjsWeb, :router
  import Phoenix.LiveView.Router

  def get_cors_origins do
    System.get_env("ALLOWED_ORIGINS", "")
    |> String.split(",", trim: true)
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {PhoenixNextjsWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug CORSPlug, origin: &__MODULE__.get_cors_origins/0
  end

  scope "/api", PhoenixNextjsWeb do
    pipe_through :api

    get "/hello", HelloController, :index
    options "/hello", HelloController, :options
  end

  if Application.compile_env(:phoenix_nextjs, :dev_routes) do
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: PhoenixNextjsWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  scope "/", PhoenixNextjsWeb do
    pipe_through :browser
    get "/*path", PageController, :index
  end
end
