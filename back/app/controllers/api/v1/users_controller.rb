class Api::V1::UsersController < ApplicationController
  def destroy
    # アカウント削除された際に、論理削除する
    # sessionデータもリセット
end
