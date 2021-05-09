import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSun } from 'types/sale';
import { BASE_URL } from 'utis/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    let chartData: ChartData = { labels: [], series: [] };

    axios.get(`${BASE_URL}/sales/amount-by-saller`)
        .then(response => {
            const data = response.data as SaleSun[];
            const MyLabels = data.map(x => x.sellerName);
            const MySeries = data.map(x => x.sum);
            chartData = { labels: MyLabels, series: MySeries }
            console.log(chartData);

        })

    const mockData = {
        series: [477138, 499928, 444867, 220426, 473088],
        labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    }

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type='donut'
            height="240"
        />

    );


}

export default DonutChart;
