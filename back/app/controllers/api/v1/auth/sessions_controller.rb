class Api::V1::Auth::SessionsController < ApplicationController
  def destroy
    reset_session
    head :ok
  end
end
