class AddImageToDrawings < ActiveRecord::Migration[8.1]
  def change
    add_column :drawings, :image, :string
  end
end
