class Api::V1::UsersController < ApplicationController
  def destroy
    # アカウント削除された際に、論理削除する
    current_user.destroy!
    reset_session
    head :ok
end
