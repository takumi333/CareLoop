class Api::V1::Auth::GuestSessionsController < ApplicationController
  include Loggable

  skip_before_action :authenticate_user!, only: %i[create]

  def create
    req_data = guest_params
    if req_data == "provider"
      user = GuestSignup.call
      session[:user_id] = user.id
      # auth APIで、userオブジェクト作成する為、DBを渡す
      render json: user, status: :created
    else
      log_info('body: providerが不足しています。', payload: req_data)
      render json: { error: 'body: providerが不足しています。' }, status: :not_found
    end
  end


  private

  def guest_params
  params.require(:user).permit(:provider)

end
