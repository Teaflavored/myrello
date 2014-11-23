Trello.Views.ListItem = Backbone.CompositeView.extend({
  //list will be composite view since it'll hold other views
  template: JST["lists/list_item"],
  tagName: "li",
  className: "list-item",
  attributes: function(){
    return {
      "data-list-ord": this.model.escape("ord"),
      "id": "list_" + this.model.id
    }
  },

  events: {
    //delegated delete event
    "click span.glyphicon-remove": "deleteListItem",
    "click button.new-card-form": "showNewCardForm",
    "sortstop .sortable-card-items": "rearrangeCard",
    "click li.card-item": "showDetails"
  },

  showDetails: function(){
    var cardItemView = new Trello.Views.CardItemShow()
    $("body").append(cardItemView.render().$el)
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

  rearrangeCard: function(event, ui){
    var data = ui.item.parent().sortable("serialize", { key: "card_list[]", attribute: "id" })
    data += "&list_id=" + ui.item.parent().data("id")
    $.ajax({
      url: "/api/boards/" + this.model.escape("board_id") + "/sort",
      type: "POST",
      dataType: "json",
      data: data,
      error: function(){
        //if error, rerender this list
        this.render()
      }.bind(this)
    })
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
    // after cards view attached need to add new button
    var newButtonView = new Trello.Views.CardNewButton()
    this.$("div.new-card-form").append(newButtonView.render().$el)




    //sort card items

    //for any new lists, also make them sortable
    this.$(".sortable-card-items").sortable({connectWith: ".sortable-card-items", dropOnEmpty: true})
    return this;
  }
})
