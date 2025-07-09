class ApplicationController < ActionController::API
  # API モードでも controller から session/cookies を使えるように
  include ActionController::Cookies

  before_action :authenticate_user! # ゲストログイン, Lineログイン時、current_userスキップコールバック使用

  attr_reader :current_user


  private

  def authenticate_user!
    @current_user = verify_session_user
    return if @current_user

    render json: { error: '認証が必要です' }, status: :unauthorized
  end
            
  def verify_session_user
    return unless session[:user_id]

    user = fetch_user(session[:user_id])
    return unless user&.active?

    reset_session  # セッション固定攻撃対策で、セッションIDを更新する
    session[:user_id] = user.id
    user
  end


  def fetch_user(id)
    User.find(id)
  rescue ActiveRecord::RecordNotFound
    nil
  end


end
