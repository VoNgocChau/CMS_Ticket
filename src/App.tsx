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
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <MenuBar />
        <Layout>
          <HeaderComponents/>
          <Layout.Content className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
