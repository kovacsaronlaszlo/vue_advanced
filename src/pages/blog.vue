<template>
    <div>

        <div class="container">
            <div class="row">
                <main class="col-12 col-md-9">
                    <div class="row px-lg-5">
                        <div class="card-deck mt-5">
                            <div class="row">
                                <BlogPostCard v-for="post in filteredPostCollection"
                                              :key="post.id"
                                              :post="post">
                                </BlogPostCard>
                            </div>
                        </div>

                        <!--<nav aria-label="Page navigation example" class="col-11 mt-5">-->
                            <!--<ul class="pagination">-->
                                <!--<li class="page-item"><a class="page-link" href="#">Előző</a></li>-->
                                <!--<li class="page-item"><a class="page-link" href="#">1</a></li>-->
                                <!--<li class="page-item"><a class="page-link" href="#">2</a></li>-->
                                <!--<li class="page-item"><a class="page-link" href="#">3</a></li>-->
                                <!--<li class="page-item"><a class="page-link" href="#">Következő</a></li>-->
                            <!--</ul>-->
                        <!--</nav>-->

                    </div>
                </main>

                <aside id="aside" class="col-12 col-md-3 my-5">

                    <!-- Search -->
                    <form class="form-inline">
                        <input class="form-control mr-sm-2 mb-2" type="search" placeholder="Search" aria-label="Keresés">
                        <button class="btn btn-sm btn-outline-success my-2 my-sm-0" type="submit">Keresés</button>
                    </form>

                    <!-- /Search -->
                    <BlogPostCategories
                            :postCollection="postCollection"
                            @categoryChange="OnCategoryChange">
                    </BlogPostCategories>

                    <!-- /Category -->
                    <div class="my-5">
                        <h3 class="mb-3">Tags</h3>
                        <a href="#" class="badge badge-primary badge-pill p-2 m-1">Informatika</a>
                        <a href="#" class="badge badge-secondary badge-pill p-2 m-1">Marketing</a>
                        <a href="#" class="badge badge-success badge-pill p-2 m-1">Oktatás</a>
                        <a href="#" class="badge badge-danger badge-pill p-2 m-1">Művészet</a>
                        <a href="#" class="badge badge-warning badge-pill p-2 m-1">Warning</a>
                        <a href="#" class="badge badge-info badge-pill p-2 m-1">Info</a>
                        <a href="#" class="badge badge-light badge-pill p-2 m-1">Light</a>
                        <a href="#" class="badge badge-dark badge-pill p-2 m-1">Dark</a>
                    </div>

                </aside>

            </div>
        </div>

    </div>
</template>
<script>
import DataService from '../DataService';
import BlogPostCard from "../componenets/BlogPostCard.vue";
import BlogPostCategories from "../componenets/BlogPostCategories.vue";
export default {
    components: {
        BlogPostCard,
        BlogPostCategories
    },
    data() {
        return {
            postCollection: [],
            filters: {}
        }
    },

    created() {
        DataService.GetPosts()
            .then(posts => {
                this.postCollection = posts;
            });
    },
    computed: {
      filteredPostCollection() {
          if (!this.$route.params.categoryName) {
              return this.postCollection;
          }

          return this.postCollection.filter(post => {
              return post.category == this.$route.params.categoryName;
          });
      }
    },
    methods: {
        OnCategoryChange(newCategory) {
            if (newCategory)
                this.$set(this.filters, 'category', newCategory);
            else
                this.$delete(this.filters, 'category');
        }
    }
}
</script>