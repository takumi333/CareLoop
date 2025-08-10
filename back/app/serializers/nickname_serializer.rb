class NicknameSerializer < ActiveModel::Serializer
  attributes :rename_user_id, :name

  belongs_to :user_relation, serializer: UserRelationSerializer
  belongs_to :user, serializer: UserSerializer
end