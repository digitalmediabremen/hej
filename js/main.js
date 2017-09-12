if(_ != undefined) {

var apiRoot = "https://api.github.com/repos/jelko/digitalehilfe/issues";
var feedElem = document.querySelector("#feed");
var feed = [];


_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.setRequestHeader("Accept","application/vnd.github.v3.html+json");
    xhr.send();
}

function renderTemplate(templateId, data) {
  var templateString = document.querySelector("template[id='" + templateId + "']").innerHTML;
  var templateFunction = _.template(templateString);
  return templateFunction(data);
}


function createQuestion(elem) {
  return {
    id: elem.id,
    title_de: elem.title,
    title_en: elem.body,
    comments: [],
    render: function() {
      var s = "";
      s += renderTemplate("questionBegin", this);
      _.each(this.comments, function(answer) {
        s += answer.render();
        console.log(s);
      });
      s += renderTemplate("questionEnd", this)

      return s;
    }
  }
}

function createAnswer(elem) {
  var answerArray = elem.body_html.split("|");
  return {
    text: elem.body_html,
    render: function() {
      return renderTemplate("answer", this)
    }
  }
}

function loadQuestions() {
  loadJSON(apiRoot, function(response) {
    console.log(response[0].title);
    _.each(response, function(elem) {
      var question = createQuestion(elem);
      
      loadAnswers(question, elem.comments_url);
      feed.push(question);
      feedElem.innerHTML = question.render();
      //console.log(elem);
      
    })
//    var htmlString = render("question", { title: response[0].title}); 
//    feedElem.innerHTML = htmlString;
  }, function (response) {
    
  })
}

function loadAnswers(question, url) {
  
  loadJSON(url, function(response) {
    _.each(response, function(elem) {
      console.log(elem);
      question.comments.push(createAnswer(elem))
      
      //rerender
      question.render();
    });
  }, function(response) {});
}


loadQuestions();

}