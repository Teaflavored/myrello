Trello.Collections.Boards = Backbone.Collection.extend({
  //collection of board models
  url: "/api/boards",
  model: Trello.Models.Board,
  comparator: function(model){
    return model.get('id')
  },

  getOrFetch: function(id){
    var board = this.get(id)
    //find board in collection, could return undefined
    if(board){
      board.fetch()
    } else {
      //if undefined set it to blank object
      board = new Trello.Models.Board({
        id: id
      })
      //fetch it to see if it exists
      board.fetch({
        success: function(){
          this.add(board)
        }.bind(this)
      })
    }

    //return right away, when the model gets updated, show view will listen and update
    return board
  }
})
