import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ManageTicket from "./components/ManageTicket/ManageTicket";
import { Layout } from "antd";
import MenuBar from "./components/SiderMenu/MenuBar";
import HeaderComponents from "./components/Header/HeaderComponents";
import './App.css'
import TicketReconci from "./components/TicketReconciliation/TicketReconci";
import ListTicket from "./components/ListTicket/ListTicket";

function App() {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [
          { x: 0, y: 120 },
          { x: 1, y: 150 },
          { x: 2, y: 180 },
          { x: 3, y: 200 },
          { x: 4, y: 220 },
          { x: 5, y: 250 },
        ],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };
  return (
    <BrowserRouter>
      <Layout>
        <MenuBar />
        <Layout>
          <HeaderComponents/>
          <Layout.Content className="content">
            <Routes>
              <Route path="/" element={<Dashboard data={chartData}/>} />
              <Route path="/dashboard" element={<Dashboard data={chartData}/>} />
              <Route path="/manage_ticket" element={<ManageTicket />} />
              <Route path="/ticket_reconciliation" element={<TicketReconci />} />
              <Route path="/services" element={<ListTicket/>} />
              {/* Thêm các Route cho các trang khác */}
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
