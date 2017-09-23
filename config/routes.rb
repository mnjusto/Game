Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root to: 'ten#index'
  root to: 'home#index'
  get 'game/ten',                       to: 'ten#index'
  get 'game/rock_paper_scissors',       to: 'rock_paper_scissors#index'
end
