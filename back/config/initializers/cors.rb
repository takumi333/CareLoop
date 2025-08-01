# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '127.0.0.1:4000', 'localhost:4000', "care-loop-brown.vercel.app"

    resource "*",
    headers: :any,
    methods: [:get, :post, :put, :patch, :delete, :options, :head],
    credentials: true

  end
end
