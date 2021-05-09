import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { round } from 'types/formt';
import { SaleSuccess } from 'types/sale';
import { BASE_URL } from 'utis/requests';


type SeriesData = {
    name: string;
    data: number[];

}
type ChartData = {
    labels: {
        categories: string[];
    },
    series: SeriesData[];
}


const BarChart = () => {

    const [chartData, setchartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-saller`)
            .then(response => {
                const data = response.data as SaleSuccess[];
                const MyLabels = data.map(x => x.sellerName);
                const MySeries = data.map(x => round(100.0 * x.deals / x.visited, 1));
                setchartData({

                    labels: {
                        categories: MyLabels
                    },
                    series: [
                        {
                            name: " %Success",
                            data: MySeries
                        }
                    ]
                }
                );

            });

    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };



    return (
        <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type='bar'
            height="240"
        />

    );
}

export default BarChart;
