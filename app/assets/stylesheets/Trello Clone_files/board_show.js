Trello.Views.BoardShow = Backbone.CompositeView.extend({
  //board show page will contain all of the lists
  //so board will be a composite view and so will lists
  template: JST["boards/show"],
  className: "board-show",

  initialize: function(){
    //will take in model of board


    this.listItemSelector = "ul.list-items"
    //listens to changes in the model so we can update its title for now

    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.lists(), "add", this.addView)

    this.model.lists().each(function(list){
      this.addView(list)
    }.bind(this))
  },
  //add a single view with a list model
  addView: function(list){
    var listView = new Trello.Views.ListItem({
      model: list
    })
    this.addSubview(this.listItemSelector, listView)
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

    return this;
  },

})
;
