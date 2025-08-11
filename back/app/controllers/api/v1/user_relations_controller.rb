class Api::V1::UserRelationsController < ApplicationController
  def index
    user_relations = UserRelation.includes(:nicknames, requester: :profile, receiver: :profile).where(requester_id: current_user.id).or( UserRelation.where(receiver_id: current_user.id)).order(requested_at: :desc)
    # log_info('relations_dataの値をチェック!', payload: user_relations)
    render json: user_relations, include: ['requester.profile', 'receiver.profile', 'nicknames'], status: :ok  #includeオプションで、孫階層まで取得する(user_relation→user→profile)
  end

  def apply
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
      sender_id: current_user.id,
      recipient_id: receiver.id,
      relation_id: user_relation.id,
      action: :relation,
      checked: false
      )
      
    end

    render status: :created

  rescue ActiveRecord::RecordInvalid => e
    log_info('resuce: 例外エラーが発生しました。')
    render json: { errors: e.record.errors.messages }, status: :unprocessable_entity
  end

  # 申請受信者が承諾
  def approve
  end

  # 申請受信者が拒否
  def reject
  end

  def rename
    # 取得したpartner_idから、ユーザー抽出
    profile_user = Profile.find_by!(partner_id: user_relation_params[:partner_id])
    partner_id = profile_user[:user_id]
    log_info('partner: ', payload: partner_id)

    relation = UserRelation.between(current_user.id, partner_id).first # firstは、同一ペアが逆で登録されていた場合の2件取得してしまう保険。

    if relation
      # レコードが存在する場合、「更新をする」というコードロジックに書きかえ
      # relation.nicknames.create!(
      #   rename_user_id: partner_id[:id],
      #   name: user_relation_params[:name]
      # )

      nickname = relation.nicknames.find_or_initialize_by(rename_user_id: partner_id)
      log_info('partner: ', payload: nickname)
      nickname.name = user_relation_params[:name]  # 既存でも新規でも共通
      nickname.save!

      render json: { message: "レコードの保存されました。" }, status: :ok
    else
      # 関係性がないので、エラー処理
      render json: { message: "関係者登録されていない可能性があります。" }, status: :unprocessable_entity
    end

  rescue ActiveRecord::RecordInvalid => e
    log_info('レコードの保存に失敗しました。')
    render json: { message: "レコードの保存に失敗しました。"}, status: :unprocessable_entity
  end



  private

  def user_relation_params
    params.require(:user_relation).permit(:name, :partner_id)
  end
end
