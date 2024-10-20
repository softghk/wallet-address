import { WalletType } from "@/@types";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartProps {
  data: WalletType[];
}

export const Chart = ({ data }: ChartProps) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {},
    colors: ["#F7931a", "#1652F0"],
    sonification: {
      duration: 27000,
      afterSeriesWait: 1200,
      defaultInstrumentOptions: {
        instrument: "basic2",
        mapping: {
          playDelay: 500,
        },
      },
      globalTracks: [
        {
          type: "speech",
          mapping: {
            text: "{point.series.name}",
            volume: 0.4,
            rate: 2,
          },
          activeWhen: function (e: any) {
            return e.point && !e.point.index;
          },
        },
      ],
    },
    legend: {
      enabled: false,
    },
    accessibility: {
      screenReaderSection: {
        axisRangeDateFormat: "%B %Y",
        beforeChartFormat: "",
      },
      point: {
        dateFormat: "%b %e, %Y",
        valueDescriptionFormat: "{value}{separator}{xDescription}",
      },
    },

    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      visible: false,
    },
    credits: {
      enabled: false,
    },

    yAxis: [
      {
        title: {
          text: "",
        },
      },
      {
        title: {
          text: "",
        },
        opposite: true,
      },
    ],

    plotOptions: {
      area: {
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
  });

  useEffect(() => {
    if (data) {
      console.log({ data });
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: [
          {
            type: "area",
            name: "USD to EUR",
            data: data.map((item) => ({
              x: new Date(item?.SwapTime?.[0]).getTime(),
              y: item.TotalFee,
            })),
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [[0, "#FEF4E8"]],
            },
          },
        ],
      }));
    }
  }, []);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
