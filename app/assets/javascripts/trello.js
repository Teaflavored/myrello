window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Trello.boards = new Trello.Collections.Boards()
    var $mainEl = $("div#main")
    new Trello.Routers.AppRouter({
      $mainEl: $mainEl
    })

    Backbone.history.start()
  }
};
