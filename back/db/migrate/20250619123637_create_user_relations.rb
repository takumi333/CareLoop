class CreateUserRelations < ActiveRecord::Migration[7.2]
  def change
    create_table :user_relations do |t|
      t.references :requester, null: false, foreign_key: true, foreign_key: { to_table: :users }
      t.references :receiver, null: false, foreign_key: true, foreign_key: { to_table: :users }
      t.integer :status, null: false
      t.datetime :requested_at, null: false
      t.datetime :accepted_at, default: nil
      t.index [:requester_id, :receiver_id], unique: true

      t.timestamps
    end
  end
end
