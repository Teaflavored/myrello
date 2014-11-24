Trello.Views.CardDescriptionButton = Backbone.View.extend({
  template: JST["cards/description_button"],
  events:{
    "click li": "showEdit"
  },

  initialize: function(options){
    this.card = options.card

  },

  showEdit: function(){
    this.$el.remove();
    var descView = new Trello.Views.ShowDescription({
      card: this.card
    });
    $("div.modal-body").append(descView.render().$el)
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)
    return this;
  }
})
