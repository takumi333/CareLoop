class User < ApplicationRecord
  has_one :profile, dependent: :destroy
  has_many :sent_user_relations, class_name: 'UserRelation', foreign_key: 'requester_id', dependent: :destroy
  # through: 前行で定義した関連名を使用して経由テーブルを明確化。source: 経由テーブルのどの関連名を参考にして、どのようなobjを取得するのか明確化。
  has_many :receivers, through: :sent_user_relations, source: :receiver
  has_many :received_user_relations, class_name: 'UserRelation', foreign_key: 'receiver_id', dependent: :destroy
  has_many :requesters, through: :received_user_relations, source: :requester
  has_many :questions, foreign_key: 'author_id', dependent: :destroy
  has_many :comments, foreign_key: 'author_id', dependent: :destroy
  has_many :sent_user_notifications, class_name: 'Notification', foreign_key: 'sender_id', dependent: :destroy
  has_many :recipients, through: :sent_user_notifications, source: :recipient
  has_many :recipient_user_notifications, class_name: 'Notification', foreign_key: 'recipient_id', dependent: :destroy
  has_many :senders, through: :recepient_user_notifications, source: :sender
  # ルーム作成者がアカウント削除した時点でグループが消滅しないよう、dependent: :destroyは付けない
  has_many :room_members, class_name: 'RoomMember'
  has_many :rooms, through: :room_members, source: :room
  # トーク相手がアカウント削除した時点で会話が消滅しないよう、dependent: :destroyは付けない
  has_many :messages, foreign_key: 'sender_id'
  has_many :messages_reads, foreign_key: 'reader_id'
  # 共有相手がアカウント削除した時点で共有スケジュールが消滅しないよう、dependent: :destroyは付けない
  has_many :shared_schedules
  has_many :schedules, through: :shared_schedules

  enum :provider, { line: 0, guest: 1 }
  enum :role, { patient: 0, home_care_giver: 1, medical_personal: 2 }

  # freezeで、配列オブジェクトを固定し、実行中に追加・削除できないようにする
  PROVIDERS = %w[line guest].freeze

  validates :uid,  presence: true, uniqueness: { scope: :provider }
  validates :name, presence: true
  validates :provider, presence: true, inclusion: { in: PROVIDERS, message: "%{value} は許可されていません" }
  validates :role, presence: true

  scope :deleted, -> { where(delete_flag: true)  }

  # ゲストログインの場合のみ実行する条件式を加える
  after_create :build_initial_profile!

  def soft_delete
    update!(delete_flag: true)
  end

  def self.create_guest!
    create!(
      uid: SecureRandom.uuid,
      provider: 1,
      role: 1,
      name: "ゲスト_#{SecureRandom.hex(4)}"
    )
  end

  def active?
    !delete_flag
  end


  private

  def build_initial_profile!
    # begin
    build_profile(
      name: self.name,
      partner_id: SecureRandom.random_number(10**10),
      image: nil
    ).save!
    # rescue ActiveRecord::RecordInvalid => e
    # record = e.record
    # record.errors.full_messages
    # end
  end
end
