<template>
    <div class="nftpricehistory">
        <apex-charts width="100%" type="line" :options="options" :series="series" ref="chart"></apex-charts>
    </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts';
import { toInt } from '@/utils/big-number.js';
import { clone } from 'fantom-vue-components/src/utils';
import { mapState } from 'vuex';
export default {
    name: 'NftPriceHistory',

    components: { ApexCharts },

    props: {
        prices: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            options: {
                chart: {
                    id: 'price-history-chart',
                    zoom: {
                        enabled: false,
                    },
                },
                stroke: {
                    curve: 'straight',
                },
                title: {
                    text: this.$t('nftpricehistory.priceTrends'),
                    align: 'left',
                },
                xaxis: {
                    type: 'datetime',
                },
                theme: {
                    mode: 'light',
                },
            },
            series: [],
        };
    },

    computed: {
        chartData() {
            let xCoordinates;
            let yCoordinates;

            let priceData = clone(this.prices);

            priceData.sort(function(a, b) {
                return new Date(a.time) - new Date(b.time); // backEnd Side ?
            });

            xCoordinates = priceData.map(item => {
                let value = new Date(item.time);
                let year = value.getFullYear();
                let mm = value.getMonth() + 1;
                let dd = value.getDate();
                return [year, (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
            });

            yCoordinates = priceData.map(item => toInt(item.price));

            return { x: xCoordinates, y: yCoordinates };
        },

        chartTheme() {
            return this.theme === 'theme-dark' ? 'dark' : 'light';
        },

        ...mapState('app', {
            theme: 'theme',
        }),
    },

    watch: {
        chartData(value) {
            if (value) {
                this.$refs.chart.updateOptions({
                    xaxis: {
                        categories: [...value.x],
                    },
                    theme: {
                        mode: this.chartTheme,
                    },
                });

                this.$refs.chart.updateSeries([
                    {
                        name: this.$t('nftpricehistory.price'),
                        data: [...value.y],
                    },
                ]);
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
