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
import { rowClassName } from "../StripedTable";

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
  const [searchText, setSearchText] = useState("");
  const [filteredDatas, setFilteredData] = useState<
    ReconciliationTicket[] | undefined
  >([]); // Dữ liệu đã lọc

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
    <div className="d-flex">
      <Card className="card__custom">
        <div>
          <h4 className="mb-4 fw-bold">Đối soát vé</h4>
        </div>
        <div className="content__style">
          <Input.Search
            placeholder="Tìm bằng số vé"
            className="input__style"
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
        <Card className="card__style">
          <h5>Lọc vé</h5>
          <Form.Item label={<span className="txt__recon">Tình trạng đối soát</span>}>
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
          <Form.Item label={<span className="txt__recon">Loại vé</span>}>
            <p className="text__style">Vé cổng</p>
          </Form.Item>
          <Form.Item label={<span className="txt__recon">Từ ngày</span>}>
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item label={<span className="txt__recon">Đến ngày</span>}>
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item className="d-flex justify-content-center">
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
