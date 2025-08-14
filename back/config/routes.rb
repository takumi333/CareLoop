Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check
  get '/health', to: proc { [200, { 'Content-Type' => 'application/json' }, ['{"status":"ok"}']] }

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      namespace :auth do
        post   'guest',  to: 'guest_sessions#create'
        post   'line',  to: 'line_sessions#create'
        delete 'logout', to: 'sessions#destroy'
      end
      resources :users, only: %i[create]
      resources :profiles, only: %i[show edit update]
      resources :user_relations, only: %i[index], path: 'user-relations' do
        post :apply, on: :collection
        member do
          patch :approve # /api/v1/user-relations/:id/approve
          patch :reject  # /api/v1/user-relations/:id/reject
          patch :rename  # /api/v1/user-relations/:id/rename
        end
      end
      resources :notifications, only: %i[index], path: 'notifications' do
        collection do
          get :unread_count # /api/v1/notifications/unread_count
          patch :mark_read  # /api/v1/notifications/mark_read
        end
      end
    end
  end
end
