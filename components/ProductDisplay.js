app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    emits: ['add-to-cart'],
    template:
    /*html*/
        `
      <p v-if="stock > 10">Disponible</p>
      <p v-else-if="stock <= 10 && stock > 0">Peu de stock</p>
      <p v-else>Plus de stock</p>

      <ul>
        <li v-for="detail in details" :key="detail.id" :style="{ color: detail.color }">
          {{ detail.text }}
        </li>
      </ul>

      <div>
        <span v-for="(carouselImage, index) in carouselImages" :key="carouselImage.id" @mouseover="updateSelectedImage(index)">
          <img height="50" alt="carouselImage.text" :src="carouselImage.image" />
        </span>
      </div>

      <img height="200" v-bind:src="image"/>

      <button @click="addToCart" :style="styles.roundButton" :disabled="stock <= 0" :class="{ disabledButton: stock <= 0 }">
        Ajouter au panier
      </button>
      
      <p>Shipping: {{ shipping }}</p>
      
      <div class="col-6 offset-3">
        <review-form @review-submitted="addReview"></review-form>
        <review-list reviews="{{reviews}}"></review-list>
      </div>
  `,
    data() {
        return {
            selectedImage: 0,
            premium: true,
            reviews: [],
            details: [
                {
                    id: 1,
                    text: 'Doux',
                    color: '#6C99C6'
                },
                {
                    id: 2,
                    text: 'Harmonieux',
                    color: '#BF9E74'
                }
            ],
            carouselImages: [
                {
                    id: 1,
                    text: 'Capsule 1',
                    image: './assets/images/colombia.png',
                },
                {
                    id:  2,
                    text: 'Capsule 2',
                    image: './assets/images/colombia_de_cote.png',
                },
                {
                    id: 3,
                    text: 'Tasse',
                    image: './assets/images/colombia_tasse.png',
                },
                {
                    id: 4,
                    text: 'Paquet',
                    image: './assets/images/colombia_paquet.png',
                }
            ],

            styles: {
                roundButton: {
                    borderRadius: '20px',
                    padding: '10px',
                    backgroundColor: 'rgb(0, 114, 180)',
                    color: 'white',
                    cursor: 'pointer'
                }
            },
        }
    },
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.carouselImages[this.selectedImage].id);
        },
        updateSelectedImage(index) {
            this.selectedImage = index
        },
    },
    computed: {
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        },
        image() {
            return this.carouselImages[this.selectedImage].image
        }
    }
});