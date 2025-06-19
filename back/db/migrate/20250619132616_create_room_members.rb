class CreateRoomMembers < ActiveRecord::Migration[7.2]
  def change
    create_table :room_members do |t|
      t.references :user, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.integer :invitee, null: false, default: 0
      t.integer :status, null: false
      t.datetime :joined_at
      t.datetime :left_at
      t.index :invitee

      t.timestamps
    end
  end
end
