import Table from "antd/es/table";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Card, DatePicker, Form, Input, Radio } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  ReconciliationTicket,
  fetchDataReconciliation,
  updateReconciliationData,
} from "../../redux/reconciliation_ticketSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Số vé",
    dataIndex: "numberTicket",
  },
  {
    title: "Ngày sử dụng",
    dataIndex: "dataUsage",
  },
  {
    title: "Tên loại vé",
    dataIndex: "nameTicket",
  },
  {
    title: "Cổng check - in",
    dataIndex: "checkinGate",
  },
  {
    title: "",
    dataIndex: "status",
  },
];

const TicketReconci = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.reconciliation.tickets);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredDatas, setFilteredData] = useState<
    ReconciliationTicket[] | undefined
  >([]); // Dữ liệu đã lọc

  const [searchText, setSearchText] = useState("")
  useEffect(() => {
    dispatch(fetchDataReconciliation());
  }, [dispatch]);

  useEffect(() => {
    // Áp dụng điều kiện lọc khi filterStatus hoặc data thay đổi
    if (data) {
      const filtered = filterData(data, filterStatus);
      setFilteredData(filtered);
    }
  }, [data, filterStatus]);

  const filterData = (data: ReconciliationTicket[], filterStatus: string) => {
    if (filterStatus === "all") {
      return data;
    } else if (filterStatus === "unreconciled") {
      return data.filter((ticket) => ticket.status === filterStatus);
    } else if (filterStatus === "Đã đối soát") {
      return data.filter((ticket) => ticket.status === filterStatus);
    }
  };

  const handleFilterSubmit = () => {
    if (data) {
      const filtered = filterData(data, filterStatus);
      setFilteredData(filtered);
    }
  };

  const rowClassName = (record: any, index: number): string => {
    if (index % 2 === 1) {
      return "table-row-striped";
    }
    return "";
  };

  // chot doi soat
  const handleReconciliation = () => {
    // lay danh sach chua doi soat
    const unreconciledTickets = data.filter(
      (ticket) => ticket.status === "Chưa đối soát"
    );

    // thay doi trang thai thanh da doi soat
    const updatedTickets = unreconciledTickets.map((ticket) => ({
      ...ticket,
      status: "Đã đối soát",
    }));
    dispatch(updateReconciliationData(updatedTickets));
  };

  const handleFilterChange = (e: any) => {
    setFilterStatus(e.target.value);
  };

  // search
  const searchDevices = () => {
    let searchData = filteredDatas;

    if (searchText !== "") {
      searchData = searchData?.filter(
        (ticket) =>
          ticket.numberTicket &&
          ticket.numberTicket.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return searchData;  
  };

  return (
    <div style={{ display: "flex" }}>
      <Card style={{ width: "1150px", height: "580px", margin: "0 30px" }}>
        <div>
          <h1>Đối soát vé</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <Input.Search
            placeholder="Tìm bằng số vé"
            style={{ width: "300px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button className="btn__custom" onClick={handleReconciliation}>
            Chốt đối soát
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={searchDevices()}
          size="small"
          pagination={{ position: ["bottomCenter"] }}
          rowClassName={rowClassName}
        />
      </Card>
      <Form layout="horizontal">
        <Card style={{ width: "350px", height: "580px", margin: "0 10px" }}>
          <h5>Lọc vé</h5>
          <Form.Item label="Tình trạng đối soát">
            <Radio.Group
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "6px 5px ",
              }}
              onChange={handleFilterChange}
              value={filterStatus}
            >
              <Radio value="all">Tất cả</Radio>
              <Radio value="unreconciled">Chưa đối soát</Radio>
              <Radio value="Đã đối soát">Đã đối soát</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Loại vé">
            <p style={{ margin: "0 35%" }}>Vé cổng</p>
          </Form.Item>
          <Form.Item label="Từ ngày">
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item label="Đến ngày">
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button className="btn__loc" onClick={handleFilterSubmit}>
              Lọc
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default TicketReconci;
