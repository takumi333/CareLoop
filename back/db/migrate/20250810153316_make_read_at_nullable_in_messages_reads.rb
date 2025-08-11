class MakeReadAtNullableInMessagesReads < ActiveRecord::Migration[7.2]
  def change
    change_column_null :messages_reads, :read_at, true
  end
end
