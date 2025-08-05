class Api::V1::UserRelationsController < ApplicationController
  def index
    # あとで、関係者取得するロジックに書き直す
    proflie = current_user.profile
    p "user確認"
    p proflie
    render json: proflie, status: :ok
  end

  def create
    # params受け取り&partner_idから申請相手を抽出
    receiver_profile = Profile.find_by!(partner_id: user_relation_params[:partner_id])
    log_info('receiver_profileの値をチェック!', payload: receiver_profile)
    receiver = User.find(receiver_profile[:user_id])
    log_info('receiverの値をチェック!', payload: receiver)

    # reqユーザー、receivedユーザー、リクエスト時間を格納する為レコード作成
    user_relation = UserRelation.new(requester_id: current_user, receiver_id: receiver, requested_at: Time.now)
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
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def update
  end



  private

  def user_relation_params
    params.require(:user_relation).permit(:name, :partner_id)
  end
end
