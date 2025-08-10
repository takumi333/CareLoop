class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :provider, :role

  has_one :profile, serializer: ProfileSerializer
end
