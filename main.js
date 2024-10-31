const app = Vue.createApp({
    data: function () {
        return {
            action:  'Achat de café',
            brand:  'Nespresso',

            stock:14,
            cart: [],

        };
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
            this.stock -= 1
        },
    },
    computed: {
        title() {
            return this.action + ' ' + this.brand
        }
    }
});

app.component("review-form", {
    emits: ['review-submitted'],
    template:
    /*html*/
        `
  <form @submit.prevent="onSubmit">
    <h3>Laissez un message</h3>
    
    <div class="form-group">
      <label for="name">Nom</label>
      <input id="name" class="form-control" v-model="name" />
    </div>

    <div class="form-group">
      <label for="review">Message</label>      
      <textarea id="review" class="form-control" v-model="review"></textarea>
    </div>

    <div class="form-group">
      <label for="rating">Note</label>
      <select id="rating" class="form-control" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </div>

    <input class="btn btn-primary mb-5" type="submit" value="Envoyer">
  </form>
  `,
    data() {
        return {
            name: '',
            review: '',
            rating: null
        };
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)

            this.name = ''
            this.review = ''
            this.rating = ''
        },

        addReview(review) {
            this.reviews.push(review)
        }
    },
});

app.component("review-list", {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
        `
    <h3>Messages :</h3>
    <div class=",card mb-3" v-for="(review, index) in reviews" :key="index">
      <h5 class="card-header">
        {{ review.name }} à noté ça {{ review.rating }} étoiles
      </h5>
    
      <div class=",card-body">
        <p class=",card-text">{{ review.review }}</p>
      </div>
    </div>
  `,
});