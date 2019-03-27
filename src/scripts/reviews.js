import Vue from 'vue';

new Vue ({
  el: "#reviews-component",
  template: "#reviews-container",
  data() {
    return {
      reviews: [],
      strafe: 0
    }
  },
  methods: {
    slide(direction) {
      const slider = this.$refs['reviews-slider'];
      const elemWidth = slider.getBoundingClientRect().width;
      const oneItemWidth = slider.firstElementChild.getBoundingClientRect().width;
      const itemInView = 2;

      const availableWidth = oneItemWidth * (slider.children.length - itemInView);

      switch (direction) {
        case "next":
          if (Math.abs(this.strafe) <= availableWidth) {
            this.strafe += elemWidth;
          }
          break;
        case "prev":
          if (Math.abs(this.strafe) > 0) {
            this.strafe -= elemWidth;
          }
          break;
      }
      slider.style.transform = `translateX(-${this.strafe}px)`;
    },
    makeArrWithRequiredImages(data) {
      return data.map(review => {
        const requiredPic = require(`../images/content/${review['author-pic']}`);
        review['author-pic'] = requiredPic;

        return review;
      });
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.makeArrWithRequiredImages(data);
  }
})