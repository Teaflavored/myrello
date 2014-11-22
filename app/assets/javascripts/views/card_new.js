Trello.Views.CardNew = Backbone.View.extend({
  template: JST["cards/new"],

  events: {
    "submit form": "createCard"
  },

  initialize: function(options){
    //needs a list item so we know which list it's for
    this.list = options.list

  },

  createCard: function(event){
    event.preventDefault()
    var cardParams = $(event.currentTarget).serializeJSON()
    cardParams.card.list_id = this.list.id
    var newCard = new Trello.Models.Card()
    newCard.set(cardParams)
    newCard.save({})
  },

  render: function(){
    var lastCard = this.list.cards().last()
    var newOrd = lastCard ? lastCard.get("ord") + 1: 0
    var renderedContent = this.template({
      ord: newOrd
    })

    this.$el.html(renderedContent)

    return this;
  }
})
