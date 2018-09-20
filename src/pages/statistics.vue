<template>
    <div class="container my-5">
        <div class="mb-5">
            <h3>Kitöltések száma munnkakörönként</h3>
            <DoughnutChart :height="200" :chartData="jobFillData"></DoughnutChart>
        </div>

        <div class="mb-5">
            <h3>Átlagfizetések munnkakörönként</h3>
            <BarChart :height="200" :chartData="jobIncomeData" :options="barChartOptions"></BarChart>
        </div>
    </div>
</template>
<script>
// data
import DataService from '../DataService';

// charts
import BarChart from "../componenets/BarChart.vue";
import DoughnutChart from "../componenets/DoughnutChart.vue";

export default {
    components: {
        DoughnutChart,
        BarChart
    },
    data() {
        return {
            rawData: [],
            defaultColors: [
                'red',
                'blue',
                'green',
                'aqua',
                'purple',
                'pink',
                'yellow'
            ]
        };
    },
    computed: {
        jobFillData() {
            let counts = this.jobs.map(job => {
                const count = this.rawData.filter(response => {
                   return response.job == job;
                }).length;

                return count;
            });

            return {
                labels: this.jobs,
                datasets: [
                    {
                        backgroundColor: this.defaultColors.slice(0, this.jobs.length),
                        data: counts
                    }
                ]
            };
        },

        jobIncomeData() {
            let datasets = this.jobs.map((job,index) => {
               let responsesInJob = this.rawData.filter(response => {
                    return response.job == job;
               });

               let totalIncome = responsesInJob.map(response =>{
                  return +response.income;
               }).reduce((acc, income) => {
                   return +acc + +income;
               });

               let avgIncome = totalIncome / responsesInJob.length;

               return {
                   label: job,
                   backgroundColor: this.defaultColors[index],
                   data: [avgIncome]
               };
            });

            return {
                datasets: datasets
            };
        },

        jobs() {
            let jobs = this.rawData.map(response => {
                return response.job;
            });

            return jobs.filter((job, index) => {
               return jobs.indexOf(job) == index;
            });
        },

        barChartOptions() {
            return {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }

    },
    created() {
        DataService.GetSurveyResponses().then(result => {
            this.rawData = Object.values(result);
        });
    }
};
</script>