import "babel-polyfill";

import {EventEmitter} from 'events';
import {githubApiRequest} from 'utils/Helpers.js';


export default class DataStore {
  static myInstance = null;
  static excludedLabels = ["public", "pinned"];


  
  constructor() {
    this.emitter = new EventEmitter();
    this.questions = undefined;
    this.filters = undefined;
    this.selectedFilters = [];
    this.initQuestions();
    this.initFilters();
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

  newQuestion() {
    
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

  initQuestions() {
    var promises = [];

    githubApiRequest("issues", "?labels=public")
      .then(d => {
        d.forEach(q => {
          promises.push( 
            githubApiRequest(q.comments_url).then(a => {
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

  initFilters() {
    githubApiRequest("labels", "?sort=issues")
      .then(d => {
        //filter public tag
        d = d.filter(filter => !DataStore.excludedLabels.includes(filter.name));
        this.filters = d;
        this.emitter.emit("update");
      }, () => {
        console.log("failed");
      })
  }
}