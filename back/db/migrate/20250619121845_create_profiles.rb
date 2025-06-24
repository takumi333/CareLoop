class CreateProfiles < ActiveRecord::Migration[7.2]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.bigint :partner_id, null: false
      t.string :image, default: nil
      t.integer :receive_schedule_notifications, null: false, default: 0
      t.integer :receive_chat_notifications, null: false, default: 0
      t.index :name
      t.index :partner_id

      t.timestamps
    end
  end
end
