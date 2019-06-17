<style lang="scss">

</style>
<template>
    <section v-html="str"></section>
</template>
<script>
    export default {
        data () {
            return {
                str:""
            }
        },
        props:['row'],
        mounted () {
            let str="";
            let questionList=this.row.question.split('$');
            let answerList=this.row.answers;
            for(let i=0;i<questionList.length;i++){
                str+=questionList[i]+(i <= answerList.length-1?`<span class='red'> ${answerList[i]} </span> `:"");
            }
            this.str=str;
        }
    }
</script>