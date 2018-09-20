<template>
    <div class="jumbotron jumbotron-fluid mb-0">
        <div class="container">
            <h1 class="">
                <slot name="title"></slot>
            </h1>
            <p class="lead">
                <slot name="lead"></slot>
            </p>
            <a class="btn btn-green btn-lg mt-3"
               :href="buttonUrl"
               role="button">
                {{buttonText}}
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'buttonText',
        'buttonUrl'
    ]
}
</script>