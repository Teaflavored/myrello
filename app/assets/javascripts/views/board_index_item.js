Trello.Views.BoardIndexItem = Backbone.View.extend({
  //index item will be passed in a model of the board
  template: JST["boards/index_item"],

  tagName: "li",

  //add a class to the li to style it
  className: "board-index-item",

  //also need attributes so we know which board to access
  attributes: function(){
    return {
      "data-id": this.model.id
    }
  },

  render: function (){
    var renderedContent = this.template({
      board: this.model
    })

    //insert renderedcontent into the element
    this.$el.html(renderedContent)
    return this;
  }
})
