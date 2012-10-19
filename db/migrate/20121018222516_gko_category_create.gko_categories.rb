# This migration comes from gko_categories (originally 20110316000000)
class GkoCategoryCreate < ActiveRecord::Migration
  def up
    unless table_exists?(:categories)
      create_table :categories, :force => true do |t|
        t.references :site
        t.references :section
        t.integer :parent_id
        t.integer :lft, :null => false, :default => 0
        t.integer :rgt, :null => false, :default => 0
        t.string :name
        t.string :slug
        t.string :path
        t.integer :level, :null => false, :default => 0

        t.string :title
        t.text :body
        t.string :meta_title
        t.text :meta_description
      end
      add_index :categories, :parent_id
      add_index :categories, :section_id
    end
    unless table_exists?(:categorizations)
      create_table :categorizations, :force => true do |t|
        t.references :categorizable, :polymorphic => true
        t.references :category
      end
      add_index :categorizations, :category_id
      add_index :categorizations, [:categorizable_id, :categorizable_type]
    end
  end

  def down
    drop_table :categorizations
    drop_table :categories
  end
end

