class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.bigint :uid, null: false
      t.string :name, null: false
      t.integer :provider, null: false, default: 0
      t.integer :role
      t.index :uid
      t.index :name

      t.timestamps
    end
  end
end
