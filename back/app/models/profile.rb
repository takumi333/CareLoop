class Profile < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :partner_id, presence: true, uniqueness: true
  enum receive_schedule_notifications: { on: 0, off: 1 }, _prefix: true
  enum receive_chat_notifications: { on: 0, off: 1 }, _prefix: true
end
