class UserRelation < ApplicationRecord
  belongs_to :requester_id
  belongs_to :receiver_id
end
