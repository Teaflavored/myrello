Trello.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],

  attributes: {
    "id":"index"
  },

  events: {
    //can click on item to show board or click on button to display new form

    "click button.new-form": "showNewForm",
    "click li.board-index-item": "showBoard",
  },

  initialize: function(options){
    //need to listen to whenever an element is added to collection

    this.listenTo(this.collection, "add", this.addView)
    this.boardListSelector = "ul.boards"

    //need to attach each of the views if they were already fetched

    this.collection.each(function(board){
      this.addView(board);
    }.bind(this))
  },

  showBoard: function(event){
    //grab the id from the board index item and navigate there

    var boardId = $(event.currentTarget).data("id");
    Backbone.history.navigate("#/boards/" + boardId, { trigger: true });
  },

  showNewForm: function(event){
    event.preventDefault();
    this.$("div.new-form").focus();
    var newBoardView = new Trello.Views.BoardNew();
    this.$("div.new-form").html(newBoardView.render().$el);
  },

  addView: function(board){
    var indexItemView = new Trello.Views.BoardIndexItem({
      model: board
    })
    this.addSubviewPre(this.boardListSelector, indexItemView);
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
})
