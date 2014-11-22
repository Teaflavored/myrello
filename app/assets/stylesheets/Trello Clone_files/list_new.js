Trello.Views.ListNew = Backbone.View.extend({
  template: JST["lists/new"],
  events: {
    "submit form": "createList"
  },

  initialize: function(options){
    //pass in this board so we can determine last ord
    //
    this.board = options.board
    //
  },

  createList: function(event){
    event.preventDefault()
    var listParams = $(event.currentTarget).serializeJSON()
    listParams.list.board_id = this.board.id
    //need to manulaly set the board_id so users can't edit this in html

    var newList = new Trello.Models.List()
    newList.set(listParams)
    newList.save({},{
      success: function(){
        //once new list is saved add it to board's lists
        this.board.lists().add(newList)
        //clear out input value
        this.$("input#list_title").val("")
      }.bind(this)
    })
  },

  render: function(){

    //when rendering the new form, always need potential next ord
    var lastList = this.board.lists().last()
    var newOrd = lastList ? lastList.get("ord") + 1 : 0

    //template needs ord and board id
    var renderedContent = this.template({
      ord: newOrd
    })

    this.$el.html(renderedContent)

    return this;
  }
})
;
