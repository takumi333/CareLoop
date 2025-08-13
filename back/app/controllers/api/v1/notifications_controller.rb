class Api::V1::NotificationsController < ApplicationController
  def index
    notifications = Notification.includes(sender: :profile).where(recipient_id: current_user.id)
    log_info('notifications: ', payload: notifications)

    notifications = 
      notifications.map { |n|
      {
        id:           n.id,
        sender_id:    n.sender_id,
        recipient_id: n.recipient_id,
        comment_id: n.comment_id,
        message_id: n.message_id,
        relation_id: n.relation_id,
        action:       n.action,
        checked:      n.checked,
        created_at:   n.created_at,
        sender_name:  n.sender&.profile&.name
      }
    }
    
    render json: { notifications: notifications }, status: :ok
  end

  def unread_count
    recipiented_notifications = Notification.where(recipient_id: current_user.id)
    unread_notifications = recipiented_notifications.where(checked: false)
    unread_count = unread_notifications.count
    render json: { notifications: unread_count}, status: :ok
  end

  def mark_read
  end


  private

  def notification_params
    # 取得するカラム追加する
    # params.require(:notification).permit(:)
  end
end
