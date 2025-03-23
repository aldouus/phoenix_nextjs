defmodule PhoenixNextjsWeb.HelloController do
  use PhoenixNextjsWeb, :controller

  def index(conn, _params) do
    json(conn, %{message: "hello world"})
  end
end
