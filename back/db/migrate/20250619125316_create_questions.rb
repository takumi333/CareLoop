class CreateQuestions < ActiveRecord::Migration[7.2]
  def change
    create_table :questions do |t|
      t.references :author, null: false, foreign_key: true, foreign_key: { to_table: :users }
      t.string :title, null: false
      t.text :body, null: false
      t.index :title

      t.timestamps
    end
  end
end
