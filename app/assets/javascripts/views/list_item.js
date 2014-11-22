Trello.Views.ListItem = Backbone.CompositeView.extend({
  //list will be composite view since it'll hold other views
  template: JST["lists/list_item"],
  tagName: "li",
  className: "list-item",

  events: {
    //delegated delete event
    "click span.glyphicon-remove": "deleteListItem"
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

  render: function(){
    var renderedContent = this.template({
      list: this.model
    })

    this.$el.html(renderedContent)
    this.attachSubviews();
    return this;
  }
})
