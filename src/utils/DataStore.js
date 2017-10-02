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
    this.interval = 60;
    
    localStorage.setItem("e-tag", undefined);
    
    this.resourceChanged = this.resourceChanged.bind(this);
    
    this.resourceChanged();
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
        this.emitter.emit("update");
      }, () => {
        console.log("failed");
      })
  }


  resourceChanged(callBack) {
    let self = this;
    if(!localStorage) return true;
    
    githubApiResourceChanged("issues/events", localStorage.getItem("e-tag"), (eTag, interval) => {
      localStorage.setItem("e-tag", eTag);
      if(interval) self.interval = interval;
      self.updateQuestions();
      self.updateFilters();
    })
    
    setTimeout(self.resourceChanged, self.interval * 1000)
  }

}