# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


guest_uid = "guest-#{SecureRandom.uuid}"
smith_uid = "U#{SecureRandom.hex(16)}"
john_uid  = "U#{SecureRandom.hex(16)}"
bob_uid   = "U#{SecureRandom.hex(16)}"


User.create!([
  { uid: guest_uid, name: 'Guest User', provider: :guest, role: :home_care_giver },
  { uid: smith_uid, name: 'Smith', provider: :line, role: :patient },
  { uid: john_uid,  name: 'Jhon',  provider: :line, role: :home_care_giver },
  { uid: bob_uid,   name: 'Bob',   provider: :line, role: :medical_personal }
])