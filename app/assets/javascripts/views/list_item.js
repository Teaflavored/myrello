Trello.Views.ListItem = Backbone.CompositeView.extend({
  //list will be composite view since it'll hold other views
  template: JST["lists/list_item"],
  tagName: "li",
  className: "list-item",

  initialize: function(){
    //list item needs to listen to adds to cards
    this.cardItemSelector = "ul.card-items"
    this.listenTo(this.model.cards(), "add", this.addView)

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

  render: function(){
    var renderedContent = this.template({
      list: this.model
    })

    this.$el.html(renderedContent)
    this.attachSubviews();
    return this;
  }
})
