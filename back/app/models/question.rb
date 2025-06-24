class Question < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :author, class_name: 'User'
end
