class CreateMessagesReads < ActiveRecord::Migration[7.2]
  def change
    create_table :messages_reads do |t|
      t.references :reader, null: false, foreign_key: true, foreign_key: { to_table: :users }
      t.references :message, null: false, foreign_key: true
      t.datetime :read_at, null: false

      t.timestamps
    end
  end
end
