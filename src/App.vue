<template>

    <div>
        <Navigation></Navigation>

        <router-view></router-view>

        <Footer></Footer>
    </div>

</template>
<script>

import Navigation from './componenets/Navigation.vue';
import Footer from './componenets/Footer.vue';


export default {
    name: 'App',
    components:{
        Navigation,
        Footer
    }
};
</script>