class AddDeleteFlagToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :delete_flag, :boolean, default: false, null: false
  end
end
