class Api::V1::Auth::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[destroy]

  def destroy
    p "リクエスト時点でsessionが存在するか確認!"
    p session[:user_id]
    reset_session
    p "本当にsessionが削除されているか確認!"
    p session[:user_id]
    # head :ok
    render json: {
      message: "session cookieの確認",
      session: session[:user_id],
    }
  end
end
