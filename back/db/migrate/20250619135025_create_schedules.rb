class CreateSchedules < ActiveRecord::Migration[7.2]
  def change
    create_table :schedules do |t|
      t.datetime :start_at, null: false
      t.datetime :end_at, null: false
      t.string :title, null: false
      t.text :memo
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
