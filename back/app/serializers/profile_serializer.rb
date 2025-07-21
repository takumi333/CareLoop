class ProfileSerializer < ActiveModel::Serializer
  attributes :partner_id

  has_one :user
end
