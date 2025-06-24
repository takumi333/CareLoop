class MessagesRead < ApplicationRecord
  belongs_to :reader, class_name: 'User'
  belongs_to :message
end
