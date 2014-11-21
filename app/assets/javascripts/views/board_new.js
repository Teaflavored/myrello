Trello.Views.BoardNew = Backbone.View.extend({
  template: JST["boards/new"],

  events: {
    "click button.close-form": "removeForm",
    "submit form": "createBoard"
  },

  removeForm: function(event){
    //check if there is event so we can reuse this removeform in create
    event && event.preventDefault()
    this.$el.empty()
  },

  createBoard: function(event){
    event.preventDefault()
    //get the params from the form and create new board
    var boardParams = $(event.currentTarget).serializeJSON()
    var newBoard = new Trello.Models.Board()
    //success callback
    var success = function(){
      Trello.boards.add(newBoard)
      this.removeForm()
    }


    newBoard.set(boardParams)
    newBoard.save({},{
      success: success.bind(this)
    })
  },

  render: function(){
    var renderedContent = this.template()

    this.$el.html(renderedContent)

    return this;
  }
})
