Trello.Views.CardItemShow = Backbone.View.extend({
  template: JST["cards/card_item_show"],
  events: {
    "hidden.bs.modal .modal": "closeModal"
  },
  closeModal: function(){
    this.$el.remove()
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    return this;
  }
})
