class Notification < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :recipient, class_name: 'User'
  belongs_to :comment, optional: true
  belongs_to :message, optional: true
  belongs_to :relation, class_name: 'UserRelation', optional: true
end
