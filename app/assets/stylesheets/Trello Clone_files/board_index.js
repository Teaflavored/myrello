Trello.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],

  events: {
    "click button.new-form": "showNewForm",
    "click li.board-index-item": "showBoard",
  },

  initialize: function(options){
    //need to listen to whenever an element is added to collection
    //then add a subview
    this.listenTo(this.collection, "add", this.addView)

    this.boardsSelector = "ul.boards"
    //need to attach each of the views if they were already fetched
    this.collection.each(function(board){
      this.addView(board)
    }.bind(this))
  },

  showBoard: function(event){
    var boardId = $(event.currentTarget).data("id")
    Backbone.history.navigate("#/boards/" + boardId, { trigger: true })
  },

  showNewForm: function(event){
    event.preventDefault()
    this.$newForm = this.$("div.new-form")
    this.$newForm.focus();
    var newBoardView = new Trello.Views.BoardNew()
    this.$newForm.html(newBoardView.render().$el)
  },

  addView: function(board){
    var indexItemView = new Trello.Views.BoardIndexItem({
      model: board
    })
    this.addSubviewPre(this.boardsSelector, indexItemView)
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    this.attachSubviews();
    return this;
  },


})
;
