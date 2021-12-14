// const Info = {
//     data(){
//         return{
//             "person":{
//                 name:{},
//                 picture:{},
//                 dob:{},
//                 location:{},
//             },
            
//         }
//     },
//     computed:{
//         prettyBirthday(){
//             return dayjs(this.person.dob.date).format('DD/MM/YYYY');
//         }
//     },
//     methods:{
//         fetchUserData(){
//             fetch('https://randomuser.me/api/')
//             .then( response => response.json())
//             .then((parsedJSON) =>{
//                 console.log(parsedJSON);
//                 this.person = parsedJSON.results[0]
//             })
//             .catch(  err => {
//                 console.error(err)
//             })
//         }
//     },
//     created(){
//         this.fetchUserData();
//     }
// }

// Vue.createApp(Info).mount('#infoApp')

const SomeApp = {
    data() {
      return {
        products: [],
        brands: [],
        prodForm: {},
        selectedBrand: null,
        selectedProduct: null,
        productForm:{}
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectBrand(b) {
            if (b == this.selectedBrand) {
                return;
            }
            this.selectedBrand = b;
            this.products = [];
            this.fetchBrandData(this.selectedBrand);
        },

        fetchProdData() {
            console.log('fetching data for ')
            fetch('/api/products/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.products = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        fetchBrands() {
            fetch('/api/brands/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.brands = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },


        fetchBrandData(b) {
            console.log('fetching data for ', b)
            fetch('/api/products/?brand=' + b.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.products = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        handleOrder(p) {
            this.selectedProduct = p;
            this.productForm = Object.assign({}, this.selectedProduct);
        },

        selectProd(p) {
            if (r == this.selectedProduct) {
                return;
            }
            this.selectedProduct = p;
            //this.games = [];
            this.fetchGameData(this.selectedReferee); 
        },


        postDate(evt){
          // this.dateForm.referee = this.selectedReferee.refID;
          fetch('api/report/?referee=' + this.dateForm.refereeID + '&start=' + this.dateForm.start + "&end=" + this.dateForm.end, {
              method:'POST',
              body: JSON.stringify(this.dateForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
          .then( response => response.json() )
          .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.assignments = json;
              
              // reset the form
              //this.dateForm = {};
            });
        },   
    },
    created() {
        this.fetchProdData();
        this.fetchBrands();
        
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#prodApp');