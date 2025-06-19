class CreateRooms < ActiveRecord::Migration[7.2]
  def change
    create_table :rooms do |t|
      t.string :name, null: false
      t.integer :notification, null: false
      t.integer :type, null: false, default: 0
      t.index :name

      t.timestamps
    end
  end
end
