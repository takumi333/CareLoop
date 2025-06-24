class CreateMessages < ActiveRecord::Migration[7.2]
  def change
    create_table :messages do |t|
      t.references :sender, null: false, foreign_key: true, foreign_key: { to_table: :users }
      t.references :room, null: false, foreign_key: true
      t.text :body, null: false

      t.timestamps
    end
  end
end
