class RenameRecepientIdToRecipientIdInNotifications < ActiveRecord::Migration[7.2]
  def change
    remove_foreign_key :notifications, column: :recepient_id
    remove_index       :notifications, :recepient_id

    rename_column :notifications, :recepient_id, :recipient_id

    add_index          :notifications, :recipient_id
    add_foreign_key    :notifications, :users, column: :recipient_id
  end
end
