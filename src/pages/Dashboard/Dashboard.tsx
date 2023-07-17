import { Card, DatePicker } from "antd";
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
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 100],
              backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)"],
              hoverOffset: 4,
            },
          ],
        };

        new Chart(ctx1, {
          type: "doughnut",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx2, {
          type: "doughnut",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
      
    }
    
  }, []);

  return (
    <div className="">
      <Card className="card__style_dashboard">
        <section>
          <h5 className="fw-bold">Thống kê</h5>
        </section>

        <div className="chart__style mt-5">
          <div className="d-flex">
            <p className="fw-bold">Doanh thu</p>
            <DatePicker className="ms-auto" size="small" format={"MM/YYYY"} />
          </div>
          <canvas
            ref={(ref) => {
              chartRef.current = ref;
            }}
            id="chart"
            style={{ width: "400px", height: "100px" }}
          />
        </div>
        <div className="mx-3">
          <small>Tổng doanh thu theo tuần</small>
          <p>
            <span className="fw-bold me-2 fs-5">500.000.000</span>Đồng
          </p>
        </div>
        <div className="circle">
          <div className="d-flex flex-column align-items-center">
            <small>Gói sự kiện</small>
            <canvas ref={chartRef2} />
          </div>
          <div className="d-flex flex-column align-items-center">
            <small>Gói gia đình</small>
            <canvas ref={chartRef1} />
          </div>
          <div>
            <p className="" style={{ whiteSpace: "nowrap" }}>
              <span
                style={{
                  backgroundColor: "#ffc234",
                  width: "10px",
                  height: "10px",
                  color: "#ffc234",
                }}
                className="mx-2"
              >
                aaaa
              </span>
              Gói gia đình
            </p>
            <p style={{ whiteSpace: "nowrap" }}>
              <span
                style={{
                  backgroundColor: "#059bff",
                  color: "#059bff",
                  width: "10px",
                  height: "10px",
                }}
                className="mx-2"
              >
                aaaa
              </span>
              Gói sự kiện
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
