import { Card } from "antd";
import "./dashboard.css";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(...registerables);

interface ChartComponentProps {
  data: ChartConfiguration["data"];
  options: ChartConfiguration["options"];
}

const Dashboard: React.FC<ChartComponentProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef1 = useRef<HTMLCanvasElement | null>(null);
  const chartRef2 = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data,
        options,
      });
      return () => {
        // Hủy bỏ biểu đồ khi component unmount
        chart.destroy();
      };
    }
  }, [data, options]);

  useEffect(() => {
    if (chartRef1.current && chartRef2.current) {
      const ctx1 = chartRef1.current.getContext("2d");
      const ctx2 = chartRef2.current.getContext("2d");
      if (ctx1 && ctx2) {
        const data = {
          
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        };

        new Chart(ctx1, {
          type: "doughnut",
          data: data,
         
        });
        new Chart(ctx2, {
          type: 'doughnut',
          data: data,
        })
      }
    }
  }, []);

  return (
    <div className="">
      <Card className="card__style_dashboard">
        <section>
          <h5>Thống kê</h5>
        </section>

        <div className="chart__style">
          <canvas ref={chartRef} id="chart" />
        </div>
        <div className="circle">
          <canvas ref={chartRef2} />
          <canvas ref={chartRef1} />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
