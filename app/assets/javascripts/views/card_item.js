Trello.Views.CardItemView = Backbone.View.extend({
  template: JST["cards/card_item"],
  tagName: "li",
  className: "card-item",

  attributes: function(){
    return {
      "id": "card_list_" + this.model.id,
      "data-card-id": this.model.id,
      "data-toggle": "modal",
      "data-target": "#myModal"
    }
  },

  render: function(){
    var renderedContent = this.template({
      card: this.model
    })

    this.$el.html(renderedContent)
    return this;
  }
})
