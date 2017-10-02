import "babel-polyfill";

import {EventEmitter} from 'events';
import {githubApiRequest, githubApiResourceChanged} from 'utils/Helpers.js';


export default class DataStore {
  static myInstance = null;
  static excludedLabels = ["public", "pinned"];


  
  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(100);
    this.questions = undefined;
    this.filters = undefined;
    this.selectedFilters = [];
        
    this.updateData = this.updateData.bind(this);
    
    this.initData();
  }

  static getInstance() {
    if (this.myInstance == null) {
        this.myInstance = new DataStore();
    }

    return this.myInstance;
  }

  getQuestions() {
    return this.questions;
  }

  getQuestion(number) {
    if(!this.questions) return;
    return this.questions.filter(q => q.number === parseInt(number, 10))[0];
  }

  getQuestionIdByNumber(number) {
    return this.questions.filter(q => q.number === parseInt(number, 10))[0].id;
  }

  addChangeListener(callback) {
    this.emitter.addListener('update', callback);
  }
 
  removeChangeListener(callback) {
    this.emitter.removeListener('update', callback);
  }

  addFilterChangeListener(callback) {
    this.emitter.addListener('update-selected-filters', callback);
  }
 
  removeFilterChangeListener(callback) {
    this.emitter.removeListener('update-selected-filters', callback);
  }

  getFilters() {
    return this.filters;
  }

  getSelectedFilters() {
    return this.selectedFilters;
  }

  setSelectedFilters(filters) {
    this.selectedFilters = filters;
    this.emitter.emit("update-selected-filters");
  }

  updateQuestions() {
    var promises = [];

    githubApiRequest("issues", "?labels=public&" + Date.now().toString())
      .then(d => {
        d.forEach(q => {
          promises.push( 
            githubApiRequest(q.comments_url, "?" + Date.now().toString()).then(a => {
              q.answers = a; 
              return q;
            })
          )
        });
        Promise.all(promises).then(d => {
          this.questions = d;
          if(localStorage) localStorage.setItem("questions", JSON.stringify(d));
          this.emitter.emit("update");
        }, () => {
          console.log("failed");
        });  
      }, () => {
        console.log("failed");
    });
  }

  updateFilters() {
    githubApiRequest("labels", "?sort=issues&" + Date.now().toString())
      .then(d => {
        //filter public tag
        this.filters = d.filter(filter => !DataStore.excludedLabels.includes(filter.name));
        if(localStorage) localStorage.setItem("filters", JSON.stringify(this.filters));

        this.emitter.emit("update");
      }, () => {
        console.log("failed");
      })
  }

  initData() {
    //load directly if localstorage is not supported
    if(!localStorage) {
      this.updateQuestions()
      this.updateFilters()
      
      setTimeout(this.updateData, 60 * 1000);
    }
    
    //try to load from cache 
    if(localStorage.getItem("filters") && localStorage.getItem("questions")) {
      //load from cache
      console.log("from cache")

      this.questions = JSON.parse(localStorage.getItem("questions"));
      this.filters = JSON.parse(localStorage.getItem("filters"));
      //fire data changed event
      this.emitter.emit("update");
      this.emitter.emit("update-selected-filters");
      
      //directly check for a newer version
      this.updateData();

    } else {
      //load from remote resource
      
      //clear e-tag in case of inconsistencies in cache
      localStorage.setItem("e-tag", undefined)
      this.updateData();
    }
  }

  updateData() {
    githubApiResourceChanged("issues/events", localStorage.getItem("e-tag"), (eTag, interval) => {
      localStorage.setItem("e-tag", eTag);
      let nextInterval = interval !== undefined ? interval : 60;
      
      this.updateQuestions();
      this.updateFilters();
      
      setTimeout(this.updateData, nextInterval * 1000)
    }, (interval) => {
      let nextInterval = interval !== undefined ? interval : 60;
      
      setTimeout(this.updateData, nextInterval * 1000)
    })
    
  }

}