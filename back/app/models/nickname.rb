class Nickname < ApplicationRecord
  belongs_to :user_relation
  belongs_to :rename_user, class_name: 'User', foreign_key: :rename_user_id

  validates :name, presence: true, length: { in: 2..10 }
end
