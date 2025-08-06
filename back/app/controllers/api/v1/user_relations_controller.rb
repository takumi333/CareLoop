class Api::V1::UserRelationsController < ApplicationController
  def index
    # あとで、関係者取得するロジックに書き直す
    relations_data = UserRelation.where(requester_id: current_user.id).or( UserRelation.where(receiver_id: current_user.id)).order(requested_at: :desc)
    log_info('relations_dataの値をチェック!', payload: relations_data)
    render json: relations_data, status: :ok
  end

  def create
    ipnut_partner_id = user_relation_params[:partner_id]
    unless ipnut_partner_id
      return render json: { message: "partner_idが送信されていません" }, status: :unprocessable_entity
    end
    if ipnut_partner_id.length != 10
      return render json: { message: "partner_idが10文字で送信されていません" }, status: :unprocessable_entity
    end

    receiver_profile = Profile.find_by!(partner_id: user_relation_params[:partner_id])
    log_info('receiver_profileの値をチェック!', payload: receiver_profile)
    receiver = User.find(receiver_profile[:user_id])
    log_info('receiverの値をチェック!', payload: receiver)

    # reqユーザー、receivedユーザー、リクエスト時間を格納する為レコード作成
    user_relation = UserRelation.new(requester_id: current_user.id, receiver_id: receiver.id, requested_at: Time.now)
    log_info('user_relationの値をチェック!', payload: user_relation)


    ActiveRecord::Base.transaction do

      user_relation.save!

      # レコード格納出来たら、notificationsテーブルにて、データ格納(通知アイコンから、通知を出す為)
      Notification.create!(
      sender_id:     current_user.id,
      recipient_id:  receiver.id,
      relation_id:   user_relation.id,
      action:        :relation,
      checked:       false
      )
      
    end

    render status: :created

  rescue ActiveRecord::RecordInvalid => e
    log_info('resuce: 例外エラーが発生しました。', payload: e.record.errors.messages)
    render json: { errors: e.record.errors.messages }, status: :unprocessable_entity
  end

  def update
  end



  private

  def user_relation_params
    params.require(:user_relation).permit(:name, :partner_id)
  end
end
