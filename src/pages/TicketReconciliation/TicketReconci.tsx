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
import { rowClassName } from "./../../components/StripedTable/index";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const TicketReconci = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.reconciliation.tickets);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] =
    useState<ReconciliationTicket[]>(data);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      render: (_: any, __: any, index: any) => index + 1,
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
      render: (status: string) => {
        if (status === "Chưa đối soát") {
          return <i style={{ color: "gray" }}>Chưa đối soát</i>;
        } else if (status === "Đã đối soát") {
          return <i style={{ color: "red" }}>Đã đối soát</i>;
        }
        return null;
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchDataReconciliation());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFilterSubmit = () => {
    const filterData = (data: ReconciliationTicket[], filterStatus: string) => {
      if (filterStatus === "all") {
        return data;
      }
      return data.filter((ticket) => ticket.status === filterStatus);
    };

    let filtered = filterData(data, filterStatus);

    if (startDate) {
      filtered = filtered.filter((ticket) =>
        dayjs(ticket.dateUsage).isAfter(startDate, "day")
      );
    }

    if (endDate) {
      filtered = filtered.filter((ticket) =>
        dayjs(ticket.dateUsage).isBefore(endDate, "day")
      );
    }

    setFilteredData(filtered);
  };

  const handleReconciliation = () => {
    const unreconciledTickets = data.filter(
      (ticket: any) => ticket.status === "Chưa đối soát"
    );

    const updatedTickets = unreconciledTickets.map((ticket) => ({
      ...ticket,
      status: "Đã đối soát",
    }));

    dispatch(updateReconciliationData(updatedTickets));
  };

  const handleExportExcel = () => {
    // Logic to export data to Excel
  };

  const handleFilterChange = (e: any) => {
    setFilterStatus(e.target.value);
  };

  const searchDevices = () => {
    let searchData = filteredData;

    if (searchText !== "") {
      searchData = searchData.filter(
        (ticket) =>
          ticket.numberTicket &&
          ticket.numberTicket.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return searchData;
  };

  const isAllReconciled = data.every(
    (ticket) => ticket.status === "Đã đối soát"
  );

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
          <Button
            className="btn__custom"
            onClick={isAllReconciled ? handleExportExcel : handleReconciliation}
          >
            {isAllReconciled ? "Xuất file Excel" : "Chốt đối soát"}
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

      <div className="card__style">
        <Form layout="horizontal">
          <h5>Lọc vé</h5>
          <Form.Item
            label={<span className="txt__recon">Tình trạng đối soát</span>}
          >
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
              <Radio value="Chưa đối soát">Chưa đối soát</Radio>
              <Radio value="Đã đối soát">Đã đối soát</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={<span className="txt__recon">Loại vé</span>}>
            <p className="text__style">Vé cổng</p>
          </Form.Item>
          <Form.Item label={<span className="txt__recon">Từ ngày</span>}>
            <DatePicker
              format={"DD/MM/YYYY"}
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Form.Item>
          <Form.Item label={<span className="txt__recon">Đến ngày</span>}>
            <DatePicker
              format={"DD/MM/YYYY"}
              value={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
            />
          </Form.Item>
          <Form.Item className="d-flex justify-content-center">
            <Button className="btn__loc" onClick={handleFilterSubmit}>
              Lọc
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TicketReconci;
