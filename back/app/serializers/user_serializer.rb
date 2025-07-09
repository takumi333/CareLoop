class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :name, :provider, :role

  has_one :profile
end
