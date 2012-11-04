# This migration comes from gko_stickers (originally 20110419175909)
class GkoStickersTranslate < ActiveRecord::Migration
  def up
    unless table_exists?(:sticker_translations)
      Sticker.create_translation_table!({
                                            :name => :string
                                        }, {:migrate_data => true})
    end
  end

  def down
    Sticker.drop_translation_table! :migrate_data => true
  end
end