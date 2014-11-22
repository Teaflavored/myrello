Trello.Views.CardNew = Backbone.View.extend({
  template: JST["cards/new"],

  events: {
    "submit form": "createCard",
    "click button.close-form": "restoreButton"
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
    newCard.save({},{
      success: function(){
        this.list.cards().add(newCard)
        this.restoreButton();
      }.bind(this)
    })
  },


  restoreButton: function(event){
    event && event.preventDefault();
    var newButtonView = new Trello.Views.CardNewButton()
    $("div.new-card-form").html(newButtonView.render().$el)
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
