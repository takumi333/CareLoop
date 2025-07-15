class Api::V1::Auth::LineSessionsController < ApplicationController
  include Loggable

  skip_before_action :authenticate_user!, only: %i[create]


  def create
    # reqで、bodyからuid,name,providerを取得
    req_data = line_params
    p req_data
    # uid&providerデータを使用して、usersテーブル「該当既存データが存在するか検証」する
    user = User.find_or_initialize_by(uid: req_data[:uid], provider: req_data[:provider])
    p "レコード作成時のuser"
    p user
    # (新規作成の場合) userデータを新規作成処理。処理完了後、userオブジェクト,ステータス201をレスポンス。
    if user.new_record?
      #  新規レコード作成されていたら、name,roleを格納。
      user.name = req_data[:name]
      user.role = req_data[:role]
      p "name,role代入時のuser"
      p user
      # userレコードをsave
      user.save!
      # sessionにuser.idをuser_idキーにセット
      # userオブジェクト,ステータス201をレスポンス。
      session[:user_id] = user.id
      render json: user, status: :created

    else
      # (既存ユーザーの場合) sessionにuser.idをuser_idキーにセットして、レスポンス
      session[:user_id] = user.id
      render json: user, status: :ok
    end
  end

  private

  def line_params
    params.require(:user).permit(:uid, :name, :provider, :role)
  end
end
