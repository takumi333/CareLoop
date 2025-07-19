class Api::V1::Auth::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[destroy]

  def destroy
    p "シークレットキーの一致確認!!"
    # Rails.logger.debug "SECRET_KEY_BASE=#{Rails.application.secret_key_base.byteslice(0,16)}..."
    Rails.logger.debug request.headers['Cookie']
    # p session.loaded?          # true なら Cookie の復号に成功
    # p session.to_hash          # {:user_id=>28} のように入っているか

    p "リクエスト時点でsessionが存在するか確認!"
    p session
    p session[:user_id]
    p session.loaded?          # true なら Cookie の復号に成功
    p session.to_hash
    reset_session
    p "本当にsessionが削除されているか確認!"
    p session[:user_id]
    head :ok
    # render json: {
    #   message: "session cookieの確認",
    #   session: session[:user_id],
    # }
  end
end
