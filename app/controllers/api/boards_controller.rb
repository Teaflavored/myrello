module Api
  class BoardsController < ApiController
    def create
      @board = current_user.boards.new(board_params)

      if @board.save
        render json: @board
      else
        render json: @board.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @board = current_user.boards.find(params[:id])
      @board.try(:destroy)
      render json: {}
    end

    def index
      @boards = current_user.boards
      render :index
    end

    def show
      @board = Board.includes(:members, lists: :cards).find(params[:id])

      if @board.is_member?(current_user)
        render :show
      else
        render json: ["You aren't a member of this board"], status: 403
      end
    end

    def sort

      @board = current_user.boards.find(params[:board_id])
      if(params["list"])
        @board.lists.sort_by!(params["list"])
      elsif params["card_list"]
        Card.sort_by!(params["card_list"], params["list_id"])
      end
      render :show
    end

    def search
      if params[:query]
        if params[:query].match(/\S/)
          @boards = Board.where("UPPER(title) ~ ?", params[:query].upcase)
        else
          @boards = Board.none
        end
      else
        @boards = Board.none
      end

      render :search
    end

    private

    def board_params
      params.require(:board).permit(:title)
    end
  end
end
