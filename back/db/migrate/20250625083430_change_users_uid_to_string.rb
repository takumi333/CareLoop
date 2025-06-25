class ChangeUsersUidToString < ActiveRecord::Migration[7.2]
  def change
    change_column :users, :uid, :string, null: false
    remove_index :users, :uid
    add_index    :users, [:provider, :uid], unique: true
  end
end
