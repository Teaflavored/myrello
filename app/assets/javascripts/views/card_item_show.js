Trello.Views.CardItemShow = Backbone.View.extend({
  template: JST["cards/card_item_show"],
  events: {
    "hidden.bs.modal .modal": "closeModal"
  },
  closeModal: function(){
    this.$el.remove()
  },

  initialize: function(options){
    this.card = options.card
  },

  render: function(){
    var renderedContent = this.template({
      card: this.card
    })
    this.$el.html(renderedContent)
    return this;
  }
})
