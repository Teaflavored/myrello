Trello.Views.ListItem = Backbone.CompositeView.extend({
  //list will be composite view since it'll hold other views
  template: JST["lists/list_item"],
  tagName: "li",
  className: "list-item",
  attributes: function(){
    return {
      "data-list-ord": this.model.escape("ord"),
      "data-list-id": this.model.id
    }
  },

  events: {
    //delegated delete event
    "click span.glyphicon-remove": "deleteListItem",
    "click button.new-card-form": "showNewCardForm"
  },

  initialize: function(options){
    //list item needs to listen to adds to cards
    //this.model refers to the list item
    this.board = options.board
    this.cardItemSelector = "ul.card-items"
    this.listenTo(this.model.cards(), "add", this.addView)

    //rendering the cards
    this.model.cards().each(function(card){
      this.addView(card)
    }.bind(this))
  },

  addView: function(card){
    var cardView = new Trello.Views.CardItemView({
      model: card
    })
    this.addSubview(this.cardItemSelector, cardView)
  },

  deleteListItem: function(event){
    event.preventDefault();
    var deleteFlag = confirm("Are you sure you want to delete that?")
    if (deleteFlag){
      var listId = $(event.currentTarget).data("id")
      var list = this.board.lists().get(listId)
      //don't need get or fetch b/c list must be there if it's on page
      list.destroy()
    }
  },

  //cover up a button with a form for a new card
  showNewCardForm: function(event){
    event.preventDefault()
    var newCardView = new Trello.Views.CardNew({
      list: this.model
    })
    this.$("div.new-card-form").html(newCardView.render().$el)
    this.$("div.new-card-form").find("input#card_title").focus()
  },

  render: function(){
    var renderedContent = this.template({
      list: this.model
    })

    this.$el.html(renderedContent)
    this.attachSubviews();
    //after cards view attached need to add new button
    var newButtonView = new Trello.Views.CardNewButton()
    this.$("div.new-card-form").append(newButtonView.render().$el)
    return this;
  }
})
