class Schedule < ApplicationRecord
  has_many :shared_schedules, dependent: :destroy
  has_many :users, through: :shared_schedules, source: :user
end
