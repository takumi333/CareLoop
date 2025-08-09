class Nickname < ApplicationRecord
  belongs_to :user_relation
  belongs_to :user

  validates :name, presence: true, length: { in: 2..10 }
end
