class Api::V1::NotificationsController < ApplicationController
  def index
    notifications = Notification.where(recipient_id: current_user)
    log_info('notifications: ', payload: notifications)
    render json: notifications, status: :ok
  end

  def unread_count
  end

  def mark_read
  end
end
