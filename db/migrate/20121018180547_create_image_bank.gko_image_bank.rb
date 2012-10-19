# This migration comes from gko_image_bank (originally 20121018135100)
class CreateImageBank < ActiveRecord::Migration
  def up
    create_table :image_bank_photos do |t|
      t.references :site
      t.references :section
      t.string :title
      t.string :caption
      t.string :content_type
      t.integer :width
      t.integer :height
      t.integer :size
      t.string :source
      t.string :source_filename
      t.timestamps
    end
    add_index :image_bank_photos, [:site_id]
    add_index :image_bank_photos, [:section_id]
  end

  def down
    remove_index :image_bank_photos, [:site_id]
    remove_index :image_bank_photos, [:section_id]
    drop_table :image_bank_photos
  end
end
