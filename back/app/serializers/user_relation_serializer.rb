class UserRelationSerializer < ActiveModel::Serializer
  attributes :status, :requested_at, :accepted_at

  belongs_to :requester, serializer: UserSerializer
  belongs_to :receiver,  serializer: UserSerializer
  has_many :nicknames, serializer: NicknameSerializer
end