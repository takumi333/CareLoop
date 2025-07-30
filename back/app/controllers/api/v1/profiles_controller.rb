class Api::V1::ProfilesController < ApplicationController

  def show
    profile = current_user.profile
    render json: profile, status: :ok
  end

  # def edit
  #   render json: { name: current_user.profile.name }, status: :ok
  # end

  def update
    params = profile_params
    # p "params確認"
    # p params
    profile = current_user.profile
    profile.name = params[:name]
    # save処理してない
    render json: profile, status: :ok
  end

  private
  def profile_params
    params.require(:profile).permit(:name)
  end
end
