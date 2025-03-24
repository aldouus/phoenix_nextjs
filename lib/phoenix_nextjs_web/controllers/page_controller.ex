defmodule PhoenixNextjsWeb.PageController do
  use PhoenixNextjsWeb, :controller

  def index(conn, _params) do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, "/app/priv/static/index.html")
  end

  def options(conn, _params) do
    conn
    |> send_resp(200, "")
  end
end
