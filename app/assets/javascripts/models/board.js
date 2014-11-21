Trello.Models.Board = Backbone.Model.extend({
  //model for a board, base url for now
  urlRoot: "/api/boards",

  //need to parse out the lists
  lists: function(){
    //need to return this because we can't store it on the prototype
    //list function should always return collection type
    this._lists = this._lists || new Trello.Collections.Lists()
    return this._lists
  },

  parse: function(jsonResp){
    //if this._lists doesn't exist need to create new collection for it

    this.lists().set(jsonResp.lists, { parse: true })
    //iterate through each list and set the cards
    //delete lists from jsonResp
    delete jsonResp.lists
    return jsonResp
  }
})
