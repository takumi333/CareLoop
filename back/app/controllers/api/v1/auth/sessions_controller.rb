class Api::V1::Auth::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[destroy]

  def destroy
    # Rails.logger.debug request.headers['Cookie']
    # p session.loaded?
    # p session.to_hash

    reset_session
    head :ok
  end
end
