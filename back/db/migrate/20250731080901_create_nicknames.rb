class CreateNicknames < ActiveRecord::Migration[7.2]
  def change
    create_table :nicknames do |t|
      t.references :user_relation, null: false, foreign_key: true
      t.bigint :rename_user_id, null: false
      t.string :name, null: false

      t.timestamps
    end
    add_foreign_key :nicknames, :users, column: :rename_user_id
    add_index :nicknames, [:user_relation_id, :rename_user_id], unique: true, name: "index_nicknames_on_relation_and_rename_user"
  end
end
