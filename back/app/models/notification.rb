class Notification < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :recepient, class_name: 'User'
  belongs_to :comment
  belongs_to :message
  belongs_to :relation, class_name: 'UserRelation'
end
