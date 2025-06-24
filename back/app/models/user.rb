class User < ApplicationRecord
  has_many :profiles, dependent: :destroy
  has_many :sent_user_relations, class_name: 'UserRelation', foreign_key: 'requester_id', dependent: :destroy
  # through: 前行で定義した関連名を使用して経由テーブルを明確化。source: 経由テーブルのどの関連名を参考にして、どのようなobjを取得するのか明確化。
  has_many :receivers, through: :sent_user_relations, source: :receiver
  has_many :received_user_relations, class_name: 'UserRelation', foreign_key: 'receiver_id', dependent: :destroy
  has_many :requesters, through: :received_user_relations, source: :requester
  has_many :questions, foreign_key: 'author_id', dependent: :destroy
  has_many :comments, foreign_key: 'author_id', dependent: :destroy
  has_many :sent_user_notifications, class_name: 'Notification', foreign_key: 'sender_id', dependent: :destroy
  has_many :recepients, through: :sent_user_notifications, source: :recepient
  has_many :recepient_user_notifications, class_name: 'Notification', foreign_key: 'recepient_id', dependent: :destroy
  has_many :senders, through: :recepient_user_notifications, source: sender
  has_many :room_members, class_name: 'RoomMembers', dependent: :destroy
  has_many :rooms, through: :room_members, source: room
  has_many :messages, foreign_key: 'sender_id', dependent: :destroy
  has_many :messages_reads, foreign_key: 'reader_id', dependent: :destroy
  has_many :shared_schedules, dependent: :destroy
  has_many :schedules, through: :shared_schedules, source: user
end
