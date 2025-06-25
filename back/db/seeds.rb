# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


GUEST_UID_BASE = "guest-#{SecureRandom.uuid}"

guest = User.find_or_create_by!(uid: GUEST_UID_BASE) do |u|
  u.name     = 'Guest User'
  u.provider = 1
  u.role     = 1
end
