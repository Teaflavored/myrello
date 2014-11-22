Trello.Views.BoardShow = Backbone.CompositeView.extend({
  //board show page will contain all of the lists
  //so board will be a composite view and so will lists
  template: JST["boards/show"],
  className: "board-show",

  events: {
    "sortdeactivate .sortable-lists": "rearrangeLists"
  },

  initialize: function(){
    //will take in model of board as this.model

    this.listItemSelector = "ul.list-items"
    //listens to changes in the model so we can update its title for now
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.lists(), "add", this.addView)
    this.listenTo(this.model.lists(), "remove", this.removeView)


    //rendering all the lists
    this.model.lists().each(function(list){
      this.addView(list)
    }.bind(this))
  },

  //add a single view with a list model
  addView: function(list){
    var listView = new Trello.Views.ListItem({
      model: list,
      board: this.model
    })
    this.addSubview(this.listItemSelector, listView)
  },

  //remove view with a list model
  removeView: function(list){
    //iterate through subviews list and find the right subview
    _.each(this.subviews(this.listItemSelector), function(view){
      if(view.model.id === list.id){
        this.removeSubview(this.listItemSelector, view)
      }
    }.bind(this))
  },

  rearrangeLists: function(event, ui){
    var $currentItem = ui.item
    console.log($currentItem.data("list-ord"))
    var listId = $currentItem.data("list-id")
    var list = this.model.lists().get(listId)
    //index of prevItem and nextItem
    var prevItemIdx = $currentItem.index() - 1
    var nextItemIdx = $currentItem.index() + 1
    var $prevItem = $currentItem.prev()
    var $nextItem = $currentItem.next()
    //number items
    var totalItems = this.model.lists().length

    //if prevItemIdx is -1, then you're moving current item to first in list, set ord to 0
    if(prevItemIdx === -1){
      var nextItemOrd = $currentItem.data("list-ord")
      list.save({ord: nextItemOrd / 2}, {
        success: function(){
          $currentItem.attr("data-list-ord", nextItemOrd / 2)
        }
      })

    } else if ( nextItemIdx >= totalItems){
      var prevItemOrd = $currentItem.data("list-ord")
      list.save({ord: prevItemOrd * 2}, {
        success: function(){
          $currentItem.attr("data-list-ord", prevItemOrd * 2)
        }
      })
    } else {
      var prevOrd = $prevItem.data("list-ord")
      var nextOrd = $nextItem.data("list-ord")
      var newOrd = (prevOrd + nextOrd) / 2
      list.save({ord: newOrd }, {
        success: function(){
          $currentItem.attr("data-list-ord", newOrd)
        }
      })
    }
  },

  //renders page, attach all subviews, adds a new form
  render: function(){
    var renderedContent = this.template({
      board: this.model,
      lists: this.model.lists()
    })

    this.$el.html(renderedContent)
    this.attachSubviews();


    var newPage = new Trello.Views.ListNew({
      board: this.model
    })
    this.$("div.new-list-form").append(newPage.render().$el)
    //create subviews for the lists

    //add sortable to a listUL
    this.$(".sortable-lists").sortable()


    return this;
  },

})
