Trello.Views.CardItemView = Backbone.View.extend({
  template: JST["cards/card_item"],
  tagName: "li",
  className: "card-item",
  attributes: function(){
    return {
      "id": "card_list_" + this.model.id
    }
  },

  render: function(){
    var renderedContent = this.template({
      card: this.model
    })

    this.$el.html(renderedContent)
    this.$el.draggable({
      drop: function(event, ui){
        alert('test')
      }
    })
    return this;
  }
})
