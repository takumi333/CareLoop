# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_06_24_122350) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.bigint "question_id", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["question_id"], name: "index_comments_on_question_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "room_id", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_messages_on_room_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "messages_reads", force: :cascade do |t|
    t.bigint "reader_id", null: false
    t.bigint "message_id", null: false
    t.datetime "read_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id"], name: "index_messages_reads_on_message_id"
    t.index ["reader_id"], name: "index_messages_reads_on_reader_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "recepient_id", null: false
    t.bigint "comment_id", null: false
    t.bigint "message_id", null: false
    t.bigint "relation_id", null: false
    t.integer "action", null: false
    t.boolean "checked", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_notifications_on_comment_id"
    t.index ["message_id"], name: "index_notifications_on_message_id"
    t.index ["recepient_id"], name: "index_notifications_on_recepient_id"
    t.index ["relation_id"], name: "index_notifications_on_relation_id"
    t.index ["sender_id"], name: "index_notifications_on_sender_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.bigint "partner_id", null: false
    t.string "image"
    t.integer "receive_schedule_notifications", default: 0, null: false
    t.integer "receive_chat_notifications", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_profiles_on_name"
    t.index ["partner_id"], name: "index_profiles_on_partner_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.string "title", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_questions_on_author_id"
    t.index ["title"], name: "index_questions_on_title"
  end

  create_table "room_members", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "room_id", null: false
    t.integer "invitee", default: 0, null: false
    t.integer "status", null: false
    t.datetime "joined_at"
    t.datetime "left_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invitee"], name: "index_room_members_on_invitee"
    t.index ["room_id"], name: "index_room_members_on_room_id"
    t.index ["user_id"], name: "index_room_members_on_user_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name", null: false
    t.integer "notification", null: false
    t.integer "type", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_rooms_on_name"
  end

  create_table "schedules", force: :cascade do |t|
    t.datetime "start_at", null: false
    t.datetime "end_at", null: false
    t.string "title", null: false
    t.text "memo"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shared_schedules", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "schedule_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["schedule_id"], name: "index_shared_schedules_on_schedule_id"
    t.index ["user_id"], name: "index_shared_schedules_on_user_id"
  end

  create_table "user_relations", force: :cascade do |t|
    t.bigint "requester_id", null: false
    t.bigint "receiver_id", null: false
    t.integer "status", null: false
    t.datetime "requested_at", null: false
    t.datetime "accepted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_user_relations_on_receiver_id"
    t.index ["requester_id", "receiver_id"], name: "index_user_relations_on_requester_id_and_receiver_id", unique: true
    t.index ["requester_id"], name: "index_user_relations_on_requester_id"
  end

  create_table "users", force: :cascade do |t|
    t.bigint "uid", null: false
    t.string "name", null: false
    t.integer "provider", default: 0, null: false
    t.integer "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "delete_flag", default: false, null: false
    t.index ["name"], name: "index_users_on_name"
    t.index ["uid"], name: "index_users_on_uid"
  end

  add_foreign_key "comments", "questions"
  add_foreign_key "comments", "users", column: "author_id"
  add_foreign_key "messages", "rooms"
  add_foreign_key "messages", "users", column: "sender_id"
  add_foreign_key "messages_reads", "messages"
  add_foreign_key "messages_reads", "users", column: "reader_id"
  add_foreign_key "notifications", "comments"
  add_foreign_key "notifications", "messages"
  add_foreign_key "notifications", "user_relations", column: "relation_id"
  add_foreign_key "notifications", "users", column: "recepient_id"
  add_foreign_key "notifications", "users", column: "sender_id"
  add_foreign_key "profiles", "users"
  add_foreign_key "questions", "users", column: "author_id"
  add_foreign_key "room_members", "rooms"
  add_foreign_key "room_members", "users"
  add_foreign_key "shared_schedules", "schedules"
  add_foreign_key "shared_schedules", "users"
  add_foreign_key "user_relations", "users", column: "receiver_id"
  add_foreign_key "user_relations", "users", column: "requester_id"
end
