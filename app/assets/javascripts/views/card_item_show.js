Trello.Views.CardItemShow = Backbone.View.extend({
  template: JST["cards/card_item_show"],
  events: {
    "hidden.bs.modal .modal": "closeModal"
  },

  initialize: function(options){
    this.card = options.card
    this.listenTo(this.card, "change:description", this.editDescription)
  },

  closeModal: function(){
    this.$el.remove()
  },

  editDescription: function(card){
    alert('hi')
    this.$("div.description").html("Description: " + card.escape("description"))
  },

  render: function(){
    var renderedContent = this.template({
      card: this.card
    })
    this.$el.html(renderedContent)
    var descButtonView = new Trello.Views.CardDescriptionButton({
      card: this.card
    })
    this.$(".modal-body").html(descButtonView.render().$el)
    return this;
  }
})
