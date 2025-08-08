class ProfileSerializer < ActiveModel::Serializer
  attributes :partner_id, :name, :image

  has_one :user, serializer: UserSerializer
end
