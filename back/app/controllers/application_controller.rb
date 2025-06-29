class ApplicationController < ActionController::API
  # API モードでも controller から session/cookies を使えるように
  include ActionController::Cookies
end
