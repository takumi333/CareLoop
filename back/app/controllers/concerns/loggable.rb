module Loggable
  extend ActiveSupport::Concern

  def log_info(msg, **extra)
    Rails.logger.info "[#{self.class}] #{msg} | #{extra.to_json}"
  end
end