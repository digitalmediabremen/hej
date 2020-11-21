import { EventEmitter } from 'events';
import { githubApiRequest, githubApiResourceChanged, isFilterInArray } from 'utils/Helpers.js';
import {areFiltersInArray} from 'utils/Helpers.js';
import { STATIC_LABELS, EXCLUDED_LABELS } from "../config";



export default class DataStore {
  static myInstance = null;
  static defaultPollInterval = 30;
  static lastFailedPollInterval = 10;
  static excludedLabels = EXCLUDED_LABELS;
  static staticLabels = STATIC_LABELS;
  static studentNames = ["Hybrid", "Confusion", "Restart", "Studios", "Chateau Lu", "Cafeteria", "Radio Studio", "Workshops", "Chaos Office", "Speicher XI", "Excitement", "Library", "Course rooms", "Coffee machine", "Segments", "Materials", "Everyone", "See you soon!", "Here we are!", "Where are you?", "Where are you going?", "How are you?", "What's up?", "Do you feel it?"]

  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(100);
    this.questions = undefined;
    this.filters = undefined;


    this.selectedFilters = [];
    this.selectedStaticFilters = [];

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

  getQuestionByNumber(number) {
    return this.questions.filter(q => q.number === number)[0];
  }

  getQuestionBySlugWithFilters(slug, selectedStaticFilters) {
    return this.questions.filter((q) => {
      return areFiltersInArray(selectedStaticFilters, q.labels) &&
        q.labels.map(l => l.name).includes(".slug-" + slug)
    })[0]
  }

  getQuestion(qid, selectedStaticFilters) {
    if (!this.questions) return;
    // check for slugs
    let q = undefined;

    if (!isNaN(qid)) {
      q = this.getQuestionByNumber(parseInt(qid))
    } else {
      q = this.getQuestionBySlugWithFilters(qid, selectedStaticFilters)
    }

    if (!!q) {
      return q
    } else {
      throw ("Question not found.")
    }
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
    if (!this.filters) return undefined;
    return DataStore.cleanFilters(this.filters, DataStore.staticLabels);
  }

  static cleanFilters(_filters, _excludes) {
    let defaultExcludes = DataStore.excludedLabels;
    if (_excludes != undefined) defaultExcludes = defaultExcludes.concat(_excludes)

    return _filters.filter(filter => !defaultExcludes.includes(filter.name) && !filter.name.startsWith("."));
  }

  getStaticFilters() {
    if (!this.filters) return undefined;
    return this.filters.filter(filter => DataStore.staticLabels.includes(filter.name));
  }

  getAllSelectedFilters() {
    if (!this.filters) return undefined;
    return this.selectedFilters.concat(this.selectedStaticFilters);
  }

  getSelectedStaticFilters() {
    if (!this.filters) return undefined;
    return this.selectedStaticFilters;
  }

  getSelectedFilters() {
    if (!this.filters) return undefined;
    return this.selectedFilters;
  }

  setSelectedFilters(selectedFilters) {
    if (!this.filters) return undefined;

    let newSelectedStaticFilters = []
    let newSelectedFilters = []

    selectedFilters.forEach((newFilter) => {
      let isStatic = 0 <= DataStore.staticLabels.findIndex(f => f === newFilter.name)

      if (isStatic) {
        newSelectedStaticFilters.push(newFilter)
        this.selectedStaticFilters = newSelectedStaticFilters;
      } else {
        newSelectedFilters.push(newFilter)
        this.selectedFilters = newSelectedFilters;
      }
    })

    this.emitter.emit("update-selected-filters");

    //only save static filters
    if (localStorage) localStorage.setItem("selected-filters", JSON.stringify(this.getSelectedStaticFilters()))
  }

  removeSelectedFilters(filters) {
    if (!this.filters) return undefined;

    filters.forEach((newFilter) => {
      let isStatic = 0 <= DataStore.staticLabels.findIndex(f => f === newFilter.name)

      if (isStatic) {
        this.selectedStaticFilters = [];
      } else {
        this.selectedFilters = [];
      }
    })

    this.emitter.emit("update-selected-filters");
    if (localStorage) localStorage.setItem("selected-filters", JSON.stringify(this.getSelectedStaticFilters()))
  }


  updateQuestions() {
    var promises = [];

    githubApiRequest("issues", "?labels=.public&" + Date.now().toString())
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
          if (localStorage) localStorage.setItem("questions", JSON.stringify(d));
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
        this.filters = DataStore.cleanFilters(d, [])
        if (localStorage) localStorage.setItem("filters", JSON.stringify(this.filters));

        this.emitter.emit("update-selected-filters");
        this.emitter.emit("update");
      }, () => {
        console.log("failed");
      })
  }

  initData() {
    //load directly if localstorage is not supported
    if (!localStorage) {
      this.updateQuestions()
      this.updateFilters()

      setTimeout(this.updateData, 60 * 1000);
    }

    //try to load from cache 
    if (localStorage.getItem("filters") && localStorage.getItem("questions")) {
      //load from cache

      try {
        console.log("data from cache")

        this.questions = JSON.parse(localStorage.getItem("questions"));
        this.filters = JSON.parse(localStorage.getItem("filters"));
      } catch (E) {
        localStorage.removeItem("questions");
        localStorage.removeItem("filters");

        console.error("error while parsing questions and filters filters")
      }

      if (localStorage.getItem("selected-filters") !== null) {

        try {
          console.log("selected-filters from cache")
          this.setSelectedFilters(JSON.parse(localStorage.getItem("selected-filters")))
        } catch (E) {
          localStorage.removeItem("selected-filters");
          console.error("error while parsing selected filters")
        }
      } else {
        // default
        let sf = this.getStaticFilters();
        if (sf != undefined && sf.length > 0) {
          console.log("selected-filters not set. default to first static filter.")
          //this.setSelectedFilters([sf[0]])
        }
      }

      //fire data changed event
      this.emitter.emit("update");
      this.emitter.emit("update-selected-filters");

      //directly check for a newer version
      this.updateData();

    } else {
      console.log("data from api")

      //load from remote resource

      //clear e-tag in case of inconsistencies in cache
      localStorage.setItem("e-tag", undefined)
      this.updateData();
    }
  }

  updateData() {
    githubApiResourceChanged("issues/events", localStorage.getItem("e-tag"), (eTag, interval) => {
      localStorage.setItem("e-tag", eTag);
      let nextInterval = interval !== null ? interval : DataStore.defaultPollInterval;

      console.log("changes detected: data from api")

      this.updateQuestions();
      this.updateFilters();

      setTimeout(this.updateData, nextInterval * 1000)
    }, (interval) => {
      let nextInterval = interval !== null ? interval : DataStore.defaultPollInterval;

      setTimeout(this.updateData, nextInterval * 1000)
    }).then(() => { }, () => {
      setTimeout(this.updateData, DataStore.lastFailedPollInterval * 1000);

    })

  }

}