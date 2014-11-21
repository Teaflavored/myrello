Trello.Models.Board = Backbone.Model.extend({
  //model for a board, base url for now
  urlRoot: "/api/boards",

  //need to parse out the lists
  lists: function(){
    //need to return this because we can't store it on the prototype
    return this._lists
  }
  // parse: function(){
  //   //if this._lists doesn't exist need to create new collection for it
  //   this._lists
  // }
})
