class Comment < ApplicationRecord
  has_many :notifications, dependent: :destroy
  belongs_to :author, class_name: 'User'
  belongs_to :question
end
