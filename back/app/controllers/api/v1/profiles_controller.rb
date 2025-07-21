class Api::V1::ProfilesController < ApplicationController

  def show
    profile = current_user.profile
    render json: profile, status: :ok
  end

  def edit
    p "editアクションに届いてる"
  end

  def update
    p "updateアクションに届いてる"
  end

  private
  def profile_params
    params.require(:profile).permit(:name)
  end
end
