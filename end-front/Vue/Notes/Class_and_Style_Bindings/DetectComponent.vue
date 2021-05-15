<template>
    <div class="container" style="background: #1d68a7;">
        <div class="row">
            <div class="col-md-4">
                <div class="metroblock buysblock">
                    <span class="icon fontawesome-ok-sign left"></span>
                    <h1>{{ getTotalOK }}</h1>
                    <div class="clearfix"></div>
                    <h2>OK</h2>
                </div>
                <div class="metroblock commentsblock">
                    <span class="icon fontawesome-warning-sign left"></span>
                    <h1>{{ getTotalNG }}</h1>
                    <div class="clearfix"></div>
                    <h2>NG</h2>
                </div>
            </div>

            <div class="col-md-8">
                <div class="passFail" :style="{color: activeColor}">
                    {{ getPass }}
                </div>
            </div>

        </div>

    </div>


</template>

<script>
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {

        computed: {
            ...mapGetters([
                'getTotalOK',
                'getTotalNG',
                'getPass'
            ]),

            activeColor: function () {
                if (this.getPass === 'PASS') {
                    //$(".passFail").css('color', 'rgb(39,183,121)');
                    return 'rgb(39,183,121)';
                } else if (this.getPass === 'FAIL') {
                    //$(".passFail").css('color', '#f44336');
                    return '#f44336';
                } else {
                    //$(".passFail").css('color', 'black');
                    return 'black';
                }
            }
        },

        methods: {
            ...mapActions([
                'loadResult'
            ]),

            loadResult2() {
                this.loadResult();
                // console.log(this.getPass + "???");
                // if (this.getPass === 'PASS') {
                //     $(".passFail").css('color', 'rgb(39,183,121)');
                // } else if (this.getPass === 'FAIL') {
                //     $(".passFail").css('color', '#f44336');
                // } else {
                //     $(".passFail").css('color', 'black');
                // }
            }
        },

        mounted() {
            setInterval(this.loadResult2, 1000);
        }
    }
</script>

<style>
    @import url(http://weloveiconfonts.com/api/?family=fontawesome);
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300);

    /* fontawesome */
    [class*="fontawesome-"]:before {
        font-family: 'FontAwesome', sans-serif;
    }
    .left {
        float: left;
    }

    .buysblock {
        background: rgb(39,183,121);
    }
    .commentsblock {
        background: #f44336;
    }

    .metroblock {
        width: 100%;
        padding: 0 1em 1em 1em;
        color: #fff;
        font-family: 'Open Sans', sans-serif;
        margin: 1em;
    }

    .metroblock h1, .metroblock h2, .metroblock .icon {
        font-weight: 300;
        margin: 0;
        padding: 0;
    }
    .metroblock h1, .metroblock .icon {
        font-size: 7em;
        text-align: center;
    }
    .metroblock .icon {
        margin-right: .2em;
    }

    .passFail {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 20em;
    }

</style>