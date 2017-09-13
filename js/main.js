var apiRoot = "https://api.github.com/repos/jelko/digitalehilfe";
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};


//MODELS

var Question = Backbone.Model.extend({
  defaults: {
      title: 'test',
      answers:
  },
  
  initialize: function () {

      
  },
  
  parse: function (response) {
    console.log(response);
    response.answers = new AnswerCollection([], { apiUrl : response.comments_url }).fetch({
      
      reset: true
    });
    
    return response;
  }


});

var Answer = Backbone.Model.extend({
  
});


//COLLECTIONS

var AnswerCollection = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.apiUrl = options.apiUrl
  },
  model: Answer,
  url: function () {
    return String(this.apiUrl);
  }
})

var QuestionCollection = Backbone.Collection.extend({
  model: Question,
  url: apiRoot + "/issues",
  parse: function(response) {
        return response;
    }
  
})

//VIEW

var Feed = Backbone.View.extend({
  tagName: "div",
  className: "feed",
  el: "#feed",
  initialize: function() {
    this.collection = new QuestionCollection();
    this.collection.bind('all', this.render, this);
    this.collection.fetch();


  },
  template: compileTemplate("question"),
  render: function() {
    console.log(this.collection.toJSON());
    this.$el.html(this.template(this.collection.toJSON()));
    return this;
  }
  

})


var feedView = new Feed({collection: QuestionCollection});

//HELPERS

function compileTemplate(templateId) {
  var templateString = document.querySelector("script[id='" + templateId + "']").innerHTML;
  return _.template(templateString);
}