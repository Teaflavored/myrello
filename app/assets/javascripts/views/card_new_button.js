Trello.Views.CardNewButton = Backbone.View.extend({
  template: JST["cards/new_button"],

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    return this;
  },


})
