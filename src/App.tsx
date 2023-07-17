import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Layout } from "antd";
import MenuBar from "./components/SiderMenu/MenuBar";
import HeaderComponents from "./components/Header/HeaderComponents";
import "./App.css";
import TicketReconci from "./pages/TicketReconciliation/TicketReconci";
import ListTicket from "./pages/ListTicket/ListTicket";
import ManageTicket from "./pages/ManageTicket/ManageTicket";


function App() {
  const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
  const chartData = {
    labels: labels,
    datasets: [
      {
        labels: "My first Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgb(254, 240, 229)",
        fill: true,
        borderColor: "rgb(255, 160, 75)",
      },
    ],
  };
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      }
    },
    plugins: {
      legend: {
        display: false, // Loại bỏ hình dấu chấm tròn
      },
      
    },
    scales: {
      x: {
        grid: {
          display: false
        },  
        ticks: {
          padding: 10, // Khoảng cách giữa các nhãn trục x (đơn vị pixel)
        },
      },
      y: {
        
        ticks: {
          maxTicksLimit: 4, // Giới hạn số lượng nhãn trục y là 4
          padding: 10, // Khoảng cách giữa các nhãn trục y (đơn vị pixel)
        },
      },
    },
  };
  return (
    <BrowserRouter>
      <Layout>
        <MenuBar />
        <Layout>
          <HeaderComponents />
          <Layout.Content className="content">
            <Routes>
              <Route
                path="/"
                element={<Dashboard data={chartData} options={chartOptions} />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard data={chartData} options={chartOptions} />}
              />

              <Route path="/manage_ticket" element={<ManageTicket />} />
              <Route
                path="/ticket_reconciliation"
                element={<TicketReconci />}
              />
              <Route path="/services" element={<ListTicket />} />
              {/* Thêm các Route cho các trang khác */}
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
