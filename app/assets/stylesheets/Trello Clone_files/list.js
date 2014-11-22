Trello.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",
  cards: function(){
    this._cards = this._cards || new Trello.Collections.Cards()
    return this._cards
  },
  parse: function(jsonResp){

    this.cards().set(jsonResp.cards)

    delete jsonResp.cards
    return jsonResp
  }
})
;
