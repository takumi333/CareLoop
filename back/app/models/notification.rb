class Notification < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :recepient
  belongs_to :comment
  belongs_to :message
  belongs_to :relation
end
