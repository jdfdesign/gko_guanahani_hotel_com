cd ~/Github/gko_guanahani_hotel_com
tail -f log/development.log

cd ~/Github/gko_guanahani_hotel_com
tail -f log/production.log

cd ~/Github/gko_guanahani_hotel_com
bundle install
rails s

cd ~/Github/gko_guanahani_hotel_com
rails s
cd ~/Github/gko_guanahani_hotel_com
RAILS_ENV=production bundle exec rake assets:precompile 
RAILS_ENV=development bundle exec rake assets:precompile 
bundle exec rake assets:precompile

bundle exec rake railties:install:migrations
bundle exec rake db:bootstrap

bundle exec rake db:master:create
bundle exec rake db:load_default 
bundle exec rake db:load_sample


cd ~/developer/workspace/gko_guanahani_hotel_com
rake jobs:work
cd ~/developer/workspace/gko_guanahani_hotel_com
rake jobs:clear

cd ~/Github/gko_joufdesign_com
bundle exec rake assets:themes:precompile

