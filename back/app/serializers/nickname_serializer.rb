class NicknameSerializer < ActiveModel::Serializer
  attributes :name

  belongs_to :user_relation, serializer: UserRelationSerializer
  belongs_to :user, serializer: UserSerializer
end