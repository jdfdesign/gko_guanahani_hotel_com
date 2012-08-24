# This migration comes from gko_core (originally 20120820063700)
class CreateLanguagesTable < ActiveRecord::Migration
  def up
    create_table :languages do |t|
      t.references :site
      t.string :name
      t.string :code
      t.string :presentation
      t.boolean :public, :default => false
      t.boolean :default, :default => false
      t.timestamps
    end
    add_index :languages, :site_id

    add_column :sites, :languages_count, :integer, :default => 0

    Site.all.each do |site|
      site.translated_locales.each_with_index do |locale, index|
        site.languages.create!({
          :name => I18n.t(:"locales.long.#{locale.to_s}"),
          :code => locale.to_s,
          :presentation => I18n.t(:"locales.long.#{locale.to_s}"),
          :public => true,
          :default => (index == 0)
        })
      end
    end
  end
  
  def down
    remove_column :sites, :languages_count
    remove_index :languages, :site_id
    drop_table :languages
  end
end
