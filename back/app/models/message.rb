class Message < ApplicationRecord
  has_many :messages_reads, dependent: :destroy
  has_many :notifications, dependent: :destroy
  belongs_to :sender, class_name: 'User'
  belongs_to :room
end
