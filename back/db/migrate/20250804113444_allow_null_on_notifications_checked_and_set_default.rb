class AllowNullOnNotificationsCheckedAndSetDefault < ActiveRecord::Migration[7.2]
  def change
    change_column_default :notifications, :checked, from: nil, to: false
    change_column_null :notifications, :checked, true
  end
end
