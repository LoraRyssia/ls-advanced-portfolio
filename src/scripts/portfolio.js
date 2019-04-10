import Vue from 'vue';
import { runInThisContext } from 'vm';

const thumbs = {
  template: "#slider-thumbs",
  props: {
    portfolio: Array,
    currentWork: Object
  }
}

const btns = {
  template: "#slider-btns"
}

const display = {
  template: "#slider-display",
  components: {
    thumbs,
    btns
  },
  props: {
    portfolio: Array,
    currentWork: Object,
    currentIndex: Number
  },
  computed: {
    reversedWorks() {
      const portfolio = [...this.portfolio];
      return portfolio.reverse();
    }
  }
}

const tags = {
  template: "#slider-tags",
  props: {
    tagsArray: Array
  }
}

const info = {
  template: "#slider-info",
  components: {
    tags
  },
  props: {
    currentWork: Object
  },
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(', ');
    }
  }
}

new Vue ({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    display,
    info
  },
  data() {
    return {
        portfolio: [],
        currentIndex: 0       
    }
  },
  computed: {
    currentWork() {
      return this.portfolio[this.currentIndex];
    }
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForCurIndex(value);
    }
  },
  methods: {
    makeInfiniteLoopForCurIndex(value) {
      const worksAmount = this.portfolio.length - 1;
      if (value > worksAmount) this.currentIndex = 0;
      if (value < 0) this.currentIndex = worksAmount;
    },
    makeArrWithRequiredImages(data) {
      return data.map(item => {
        const requiredPic = require(`../images/content/${item.photo}`);
        item.photo = requiredPic;

        return item;
      });
    },
    handleSlide(direction) {
      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;
      }
    },
    activateSlide(currentSlide) {
      return this.currentIndex = currentSlide - 1;
    }
  },
  created() {
    const data = require('../data/portfolio.json');
    this.portfolio = this.makeArrWithRequiredImages(data);
    
  }
})