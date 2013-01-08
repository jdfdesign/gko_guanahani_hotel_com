GkoGuanahaniHotelCom::Application.configure do
  config.active_support.deprecation = :log
  config.action_mailer.delivery_method = :letter_opener
end
