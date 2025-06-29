class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :role

  has_one :profile
end
