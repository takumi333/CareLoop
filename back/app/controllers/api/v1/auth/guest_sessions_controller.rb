class Api::V1::Auth::GuestSessionsController < ApplicationController

  def create
    user = GuestSignup.call
    session[:user_id] = user.id
    render json: user, status: :created
  end
end
