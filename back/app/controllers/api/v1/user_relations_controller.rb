class Api::V1::UserRelationsController < ApplicationController
  def index
    # あとで、関係者取得するロジックに書き直す
    proflie = current_user.profile
    p "user確認"
    p proflie
    render json: proflie, status: :ok
  end

  def create
    
  end

  def update
  end



  private

  def user_relation_params
    params.require(:user_relation).permit(:name, :partner_id)
  end
end
