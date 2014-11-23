Trello.Views.BoardShow = Backbone.CompositeView.extend({
  //board show page will contain all of the lists
  //so board will be a composite view and so will lists
  template: JST["boards/show"],
  className: "board-show",

  events: {
    "sortstop .sortable-lists": "rearrangeLists"
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
    var serializedId = $(".sortable-lists").sortable("serialize", { key: "list[]" })
    var url = "/api/boards/" + this.model.id + "/sort"
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: serializedId,
      error: function(){
        Backbone.history.navigate("#/boards/" + this.model.id , {trigger: true})
      }
    })
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
    //add sortable here to card items, but still need to add to new list
    this.$(".sortable-card-items").sortable({connectWith: ".sortable-card-items",dropOnEmpty: true})

    return this;
  },

})
