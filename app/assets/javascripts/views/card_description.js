Trello.Views.ShowDescription = Backbone.View.extend({
  template: JST["cards/description"],

  events: {
    "click button.close-form": "closeForm",
    "submit form": "submitDescription"
  },

  initialize: function(options){
    this.card = options.card
  },

  submitDescription: function(event){
    event.preventDefault();
    var cardParams = $(event.currentTarget).serializeJSON()

    this.card.set(cardParams)
    this.card.save({},{
      success: function(){
        this.closeForm();
      }.bind(this)
    })
  },

  closeForm: function(event){
    event && event.preventDefault()
    this.$el.remove();

    var descButtonView = new Trello.Views.CardDescriptionButton({
      card: this.card
    })

    $(".modal-body").html(descButtonView.render().$el)
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    return this;
  }
})
