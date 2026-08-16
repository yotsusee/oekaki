class Drawing < ApplicationRecord
  mount_uploader :image, DrawingImageUploader
end
