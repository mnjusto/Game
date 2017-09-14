Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root to: 'ten#index'
  root to: 'home#index'
  get '/ten', to: 'ten#index'
end
