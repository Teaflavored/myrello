Trello.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "/boards/:id": "boardShow"
  },

  initialize: function(options){
    this.$mainEl = options.$mainEl
  },

  boardIndex: function(){
    var indexView = new Trello.Views.BoardIndex({
      collection: Trello.boards
    })
    this._swapView(indexView)
    Trello.boards.fetch()
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view
    this.$mainEl.html(this._currentView.render().$el)
  }
})
