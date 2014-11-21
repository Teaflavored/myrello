Trello.Collections.Boards = Backbone.Collection.extend({
  //collection of board models
  url: "/api/boards",
  model: Trello.Models.Board,
  comparator: function(model){
    return model.get('id')
  }
})
