class Message < ApplicationRecord
  belongs_to :senderv
  belongs_to :room
end
