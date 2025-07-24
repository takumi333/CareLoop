class ProfileSerializer < ActiveModel::Serializer
  attributes :partner_id, :name

  has_one :user
end
