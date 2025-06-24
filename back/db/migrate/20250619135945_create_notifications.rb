class CreateNotifications < ActiveRecord::Migration[7.2]
  def change
    create_table :notifications do |t|
      t.references :sender, null: false, foreign_key: true, foreign_key: { to_table: :users }
      t.references :recepient, null: false, foreign_key: true, foreign_key: { to_table: :users }
      t.references :comment, null: false, foreign_key: true
      t.references :message, null: false, foreign_key: true
      t.references :relation, null: false, foreign_key: true, foreign_key: { to_table: :user_relations }
      t.integer :action, null: false
      t.boolean :checked, null: false, default: nil

      t.timestamps
    end
  end
end
