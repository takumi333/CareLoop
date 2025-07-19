class Api::V1::Auth::LineSessionsController < ApplicationController
  include Loggable

  skip_before_action :authenticate_user!, only: %i[create]


  def create
    req_data = line_params
    user = User.find_or_initialize_by(uid: req_data[:uid], provider: req_data[:provider])

    # p "シークレットキーの一致確認!!"
    # Rails.logger.debug "SECRET_KEY_BASE=#{Rails.application.secret_key_base.byteslice(0,16)}..."

    if user.new_record?

      user.name = req_data[:name]
      user.role = req_data[:role]

      user.save!
      session[:user_id] = user.id
      p "user_idに代入された値確認!!"
      p session[:user_id]
      render json: user, status: :created
    else
      session[:user_id] = user.id
      p "user_idに代入された値確認!!"
      p session[:user_id]
      # p "sessionに代入されたキーを確認!!"
      # Rails.logger.debug "[CREATE] after set session.loaded?=#{session.loaded?} hash=#{session.to_hash.inspect}"
      render json: user, status: :ok
    end
  end

  private

  def line_params
    params.require(:user).permit(:uid, :name, :provider, :role)
  end
end
