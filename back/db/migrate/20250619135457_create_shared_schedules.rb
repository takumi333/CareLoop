class CreateSharedSchedules < ActiveRecord::Migration[7.2]
  def change
    create_table :shared_schedules do |t|
      t.references :user, null: false, foreign_key: true
      t.references :schedule, null: false, foreign_key: true

      t.timestamps
    end
  end
end
