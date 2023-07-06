import { Card } from "antd";
import "./dashboard.css";
import Chart, { ChartData, ChartTypeRegistry } from "chart.js/auto";
import { useEffect, useRef } from "react";

interface Props {
  data:
    | ChartData<keyof ChartTypeRegistry, Chart.ChartPoint[], string>
    | undefined;
}
const Dashboard: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx && data) {
        new Chart(ctx, {
          type: "line", // Thay đổi type thành 'line' để tạo line chart
          data: data,
          options: {
            // Cấu hình tùy chọn biểu đồ
          },
        });
      }
    }
  }, [data]);
  return (
    <div>
      <Card className="card__style_dashboard">
        <section>
          <h1>Thống kê</h1>
        </section>

        <div>
          <canvas ref={chartRef}></canvas>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
