# This migration comes from gko_categories (originally 20110326888888)
class GkoCategoryGlobalize < ActiveRecord::Migration
  def self.up
    unless table_exists?(:category_translations)
      Category.create_translation_table!({
                                             :title => :string,
                                             :body => :text,
                                             :meta_title => :string,
                                             :meta_description => :text,
                                             :slug => :string,
                                             :path => :string
                                         }, {:migrate_data => true})
    end
  end

  def self.down
    Category.drop_translation_table! :migrate_data => true
  end
end

