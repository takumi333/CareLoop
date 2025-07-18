class Api::V1::Auth::LineSessionsController < ApplicationController
  include Loggable

  skip_before_action :authenticate_user!, only: %i[create]


  def create
    req_data = line_params
    user = User.find_or_initialize_by(uid: req_data[:uid], provider: req_data[:provider])

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
      render json: user, status: :ok
    end
  end

  private

  def line_params
    params.require(:user).permit(:uid, :name, :provider, :role)
  end
end
