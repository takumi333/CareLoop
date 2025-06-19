class MessagesRead < ApplicationRecord
  belongs_to :reader
  belongs_to :message
end
