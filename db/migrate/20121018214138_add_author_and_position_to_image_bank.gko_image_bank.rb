# This migration comes from gko_image_bank (originally 20121018172100)
class AddAuthorAndPositionToImageBank < ActiveRecord::Migration
  def up
    add_column :image_bank_photos, :author, :string
    add_column :image_bank_photos, :position, :integer, :default => 1
  end

  def down
    remove_column :image_bank_photos, :author
    remove_column :image_bank_photos, :position
  end
end
