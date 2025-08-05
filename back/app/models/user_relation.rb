class UserRelation < ApplicationRecord
  has_many :notifications, foreign_key: 'relation_id', dependent: :destroy
  belongs_to :requester, class_name: 'User', foreign_key: 'requester_id'
  belongs_to :receiver, class_name: 'User', foreign_key: 'receiver_id'

  # 仮想属性
  attr_accessor :partner_id, :name

  # バリデーション(名前変更用nameと関係者追加用partner_idのバリデーション)
  validates :partner_id, presence: true, length: { is: 10 }, on: :create
  validates :name, presence: true, length: { in: 2..10 }, on: :update

  # statusのenum設定
  enum :status, [ :pending, :accepted, :rejection ] 
end
