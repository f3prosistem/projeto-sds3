import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSun } from 'types/sale';
import { BASE_URL } from 'utis/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {
    const [chartData, setchartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-saller`)
            .then(response => {
                const data = response.data as SaleSun[];
                const MyLabels = data.map(x => x.sellerName);
                const MySeries = data.map(x => x.sum);
                setchartData({ labels: MyLabels, series: MySeries });
            });

    }, []);


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
