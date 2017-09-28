import "babel-polyfill";

import {EventEmitter} from 'events';
import {githubApiRequest, areFiltersInArray} from './Helpers.js';


export default class DataStore {
  static myInstance = null;
  
  constructor() {
    this.emitter = new EventEmitter();
    this.questions = [];
    this.initQuestions();
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

  getQuestion(id) {
    return this.questions.filter(q => q.number === parseInt(id))[0];
  }

  subscribe(callback) {
    this.emitter.addListener('update', callback);
  }
 
  unsubscribe(callback) {
    this.emitter.removeListener('update', callback);
  }

  newQuestion() {
    
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
}