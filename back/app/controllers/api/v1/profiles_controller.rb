class Api::V1::ProfilesController < ApplicationController

  def show
    profile = current_user.profile
    render json: profile, status: :ok
  end

  def update
    profile = current_user.profile
    

    if profile.update(profile_params)
      render json: profile, status: :ok
    else
      render json: { errors: "データを上書き保存できませんでした。" }, status: :unprocessable_entity
    end
  end

  private
  def profile_params
    params.require(:profile).permit(:name)
  end
end
