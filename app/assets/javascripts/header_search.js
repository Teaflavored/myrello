$.BoardsSearch = function(el){
  this.$el = $(el);
  this.$ul = this.$el.find("ul");
  this.$input = this.$el.find("input");
  this.handleInput();
}

$.BoardsSearch.prototype.renderResults = function(boards){
  this.$ul.html("")
  var template = JST["header/search_results"]
  var renderedContent = template({
    boards: boards
  })
  this.$ul.html(renderedContent)
  this.clickLink();
}

$.BoardsSearch.prototype.clickLink = function(){
  this.$ul.on("click", "li", function(event){
    var boardId = $(event.currentTarget).data("id");
    Backbone.history.navigate("#/boards/" + boardId, { trigger: true })
    this.$ul.empty();
    this.$input.val("")
  }.bind(this))
}

$.BoardsSearch.prototype.handleInput = function(){
  var that = this;
  this.$input.on("keyup", function(event){
    $.ajax({
      url: "/api/boards/search",
      type: "GET",
      data: {"query": that.$input.val()},
      dataType: 'json',
      success: function (boards) {
        that.renderResults(boards)
      }
    })
  })
}

$.fn.boardsSearch = function(){
  return this.each(function(){
    new $.BoardsSearch(this);
  })
}

$(function(){
  $("div.boards-search").boardsSearch()
})
