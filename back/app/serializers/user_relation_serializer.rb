class ProfileSerializer < ActiveModel::Serializer
  attributes :requester_id, :receiver_id, :status, :requested_at, :accepted_at, 

  has_many :profile
end