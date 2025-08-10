class ChangeNullConstraintsOnNotifications < ActiveRecord::Migration[7.2]
  def change
    change_column_null :notifications, :comment_id,  true
    change_column_null :notifications, :message_id,  true
    change_column_null :notifications, :relation_id, true
  end
end
