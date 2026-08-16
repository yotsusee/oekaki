class DrawingsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @drawings = Drawing.order(created_at: :desc)
  end

  def show
    @drawing = Drawing.find(params[:id])
  end


  def create
    drawing = Drawing.new(drawing_params)
    Rails.logger.info "PARAMS: #{params.inspect}"
    if drawing.save
      render json: { status: "ok", id: drawing.id }
    else
      render json: { status: "error", errors: drawing.errors.full_messages }, status: 422
    end
  end

  private

  def drawing_params
    params.permit(:title, :odai, :image)
  end
end
