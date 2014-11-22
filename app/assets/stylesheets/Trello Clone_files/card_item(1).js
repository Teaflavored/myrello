Trello.Views.CardItemView = Backbone.View.extend({
  template: JST["cards/card_item"],
  tagName: "li",
  className: "card-item",

  render: function(){
    var renderedContent = this.template({
      card: this.model
    })

    this.$el.html(renderedContent)


    return this;
  }
})
;
