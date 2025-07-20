class Api::V1::Auth::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[destroy]

  def destroy
    # Rails.logger.debug request.headers['Cookie']
    # p session.loaded?          # true なら Cookie の復号に成功
    # p session.to_hash          # {:user_id=>28} のように入っているか

    reset_session
    head :ok
  end
end
