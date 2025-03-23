defmodule PhoenixNextjs.ConfigHelper do
  def get_env(key) do
    System.get_env(key) || raise "missing environment variable: #{key}"
  end
end
