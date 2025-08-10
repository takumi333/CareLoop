class AddDefaultToUserRelationsStatus < ActiveRecord::Migration[7.2]
  def change
    change_column_default :user_relations, :status, from: nil, to: 0
  end
end
