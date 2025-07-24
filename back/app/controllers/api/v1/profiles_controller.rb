class Api::V1::ProfilesController < ApplicationController

  def show
    profile = current_user.profile
    render json: profile, status: :ok
  end

  def edit
    render json: { name: current_user.profile.name }, status: :ok
  end

  def update
    params = profile_params
    p "params"
    p "updateアクションに届いてる"
    render status: :ok
  end

  private
  def profile_params
    params.require(:profile).permit(:name)
  end
end
