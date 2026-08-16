class CreateDrawings < ActiveRecord::Migration[8.1]
  def change
    create_table :drawings do |t|
      t.string :title
      t.string :odai
      t.text :image_data

      t.timestamps
    end
  end
end
