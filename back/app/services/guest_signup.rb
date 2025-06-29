class GuestSignup
  def self.call
    User.transaction do
      User.create_guest!
    end
  end
end