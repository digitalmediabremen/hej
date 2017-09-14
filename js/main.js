var apiRoot = "https://api.github.com/repos/jelko/digitalehilfe";
var feedElem = document.querySelector("#feed");

Backbone.Model.prototype.toJSON = function() {
  var json = _.clone(this.attributes);
  for(var attr in json) {
    if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
      json[attr] = json[attr].toJSON();   
    }
  }
  return json;
};


//MODELS

var QuestionModel = Backbone.Model.extend({

  initialize: function () {
    this.answers = new AnswerCollection();
    this.answers.question = this;
    this.answers.fetch({
      success: function () {
        feed.render();
      }
    });   
  },
  
  parse: function (response) {
    this.title = response.title;
    return response;
  },
  
  toJSON: function() {
    var r = _.extend(
      _.pick(this.attributes, 'title', '', 'type'),
      { answers: this.answers.toJSON() }
    );
    console.log(r)
    return r;
  }

});

var AnswerModel = Backbone.Model.extend({
  initialize: function() {
    
  },
  
  parse: function(response) {
    return response
  }
});


//COLLECTIONS

var AnswerCollection = Backbone.Collection.extend({
  model: AnswerModel,
  url: function () {
    return this.question.get("comments_url");
  }
})

var QuestionCollection = Backbone.Collection.extend({
  model: QuestionModel,
  url: apiRoot + "/issues",

  
})

//VIEW

var QuestionView = Backbone.View.extend({
  tagName: "div",
  template: compileTemplate("question"),
  initialize: function() {
    this.render();
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()))
    return this;
  }
});

var FeedView = Backbone.View.extend({
  el: "#feed",
  initialize: function() {
    this.collection = new QuestionCollection();
    this.collection.fetch({reset: true});
    // Ensure our methods keep the `this` reference to the view itself
    _.bindAll(this, 'render');

    // Bind collection changes to re-rendering
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.render);
    this.collection.bind('remove', this.render);
  },
  render: function() { 
    var self = this
    self.el.innerHTML = "";
    console.log(self.el);

    this.collection.each(function(question) {
      var qv = new QuestionView({model: question})
//      feedElem.el.appendChild(qv.render().el);
      self.el.appendChild( qv.render().el );
    })
  }
})

var feed = new FeedView();
feed.render();



//HELPERS

function compileTemplate(templateId) {
  var templateString = document.querySelector("script[id='" + templateId + "']").innerHTML;
  return _.template(templateString);
}