class Room < ApplicationRecord
  has_many :room_members, dependent: :destroy
  has_many :members, through: :room_members, source: :user
end
