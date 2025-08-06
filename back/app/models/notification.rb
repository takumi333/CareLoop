class Notification < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :recipient, class_name: 'User'
  belongs_to :comment, optional: true
  belongs_to :message, optional: true
  belongs_to :relation, class_name: 'UserRelation', optional: true

  enum :action, [ :comment, :message, :relation ], prefix: :action # アソシエーションメソッドとの競合避ける為、接頭辞にaciotn付ける
end
