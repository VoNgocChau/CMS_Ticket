import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Table,
  Tag,
} from "antd";
import "./ticket.css";
import { FilterOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Ticket, fetchTicketData } from "../../redux/features/ticketSlice";
import { exportToExcel } from "./exportExcel";
import { fetchDataEvent } from "../../redux/features/eventSlice";

const familyPackageColumns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Booking Code",
    dataIndex: "bookingCode",
  },
  {
    title: "Số vé",
    dataIndex: "numTicket",
  },
  {
    title: "Tình trạng sử dụng",
    dataIndex: "usageStatus",
    render: (usageStatus: string) => {
      let tagColor = "";
      let badgeStatus = "";

      switch (usageStatus) {
        case "Đã sử dụng":
          tagColor = "blue";
          badgeStatus = "Đã sử dụng";
          break;
        case "Chưa sử dụng":
          tagColor = "green";
          badgeStatus = "Chưa sử dụng";
          break;
        case "Hết hạn":
          tagColor = "red";
          badgeStatus = "Hết hạn sử dụng";
          break;
        default:
          tagColor = "";
          badgeStatus = "";
          break;
      }

      return (
        <Tag color={tagColor}>
          <Badge color={tagColor} text={badgeStatus} />
        </Tag>
      );
    },
  },
  {
    title: "Ngày sử dụng",
    dataIndex: "dateUsage",
  },
  {
    title: "Ngày xuất vé",
    dataIndex: "dateIssue",
  },
  {
    title: "Cổng check-in",
    dataIndex: "checkinGate",
  },
];

const eventPackageColumns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Booking Code",
    dataIndex: "bookingCode",
  },
  {
    title: "Số vé",
    dataIndex: "numTicket",
  },
  {
    title: "Tên sự kiện",
    dataIndex: "nameEvent",
  },
  {
    title: "Tình trạng sử dụng",
    dataIndex: "usageStatus",
    render: (usageStatus: string) => {
      let tagColor = "";
      let badgeStatus = "";

      switch (usageStatus) {
        case "Đã sử dụng":
          tagColor = "blue";
          badgeStatus = "Đã sử dụng";
          break;
        case "Chưa sử dụng":
          tagColor = "green";
          badgeStatus = "Chưa sử dụng";
          break;
        case "Hết hạn":
          tagColor = "red";
          badgeStatus = "Hết hạn sử dụng";
          break;
        default:
          tagColor = "";
          badgeStatus = "";
          break;
      }

      return (
        <Tag color={tagColor}>
          <Badge color={tagColor} text={badgeStatus} />
        </Tag>
      );
    },
  },
  {
    title: "Ngày sử dụng",
    dataIndex: "dateUsage",
  },
  {
    title: "Ngày xuất vé",
    dataIndex: "dateIssue",
  },
  {
    title: "Cổng check-in",
    dataIndex: "checkinGate",
  },
];

const ManageTicket = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.tickets.tickets);
  const eventData = useAppSelector((state) => state.events.events);
  const [searchText, setSearchText] = useState("");
  const [usageStatus, setUsageStatus] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchTicketData()),
        dispatch(fetchDataEvent()),
      ]);
    };
    fetchData();
  }, [dispatch]);

 

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleFilterSubmit = () => {
    setShowModal(false);
  };

  const rowClassName = (record: Ticket, index: number): string => {
    return index % 2 === 1 ? "table-row-striped" : "";
  };

  // search
  const searchDevices = () => {
    let filteredData = data;

    if (searchText !== "") {
      filteredData = filteredData.filter(
        (ticket) =>
          ticket.bookingCode &&
          ticket.bookingCode.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filteredData;
  };

  // render table
  const renderTable = () => {
    if (selectedPackage === "Gói gia đình") {
      return (
        <Table
          columns={familyPackageColumns}
          dataSource={searchDevices()}
          rowClassName={rowClassName}
          bordered
          size="middle"
          pagination={{ position: ["bottomCenter"] }}
        />
      );
    }
    if (selectedPackage === "Gói sự kiện") {
      return (
        <Table
          columns={eventPackageColumns}
          dataSource={eventData}
          rowClassName={rowClassName}
          bordered
          size="middle"
          pagination={{ position: ["bottomCenter"] }}
        />
      );
    }
    return (
      <Table
        columns={familyPackageColumns}
        dataSource={searchDevices()}
        rowClassName={rowClassName}
        bordered
        size="middle"
        pagination={{ position: ["bottomCenter"] }}
      />
    );
  };


  return (
    <div>
      <Card className="card__style">
        <div>
          <h3>Danh sách vé</h3>
        </div>
        <div>
          <Button
            type="text"
            onClick={() => setSelectedPackage("Gói gia đình")}
          >
            Gói gia đình
          </Button>
          <Button type="text" onClick={() => setSelectedPackage("Gói sự kiện")}>
            Gói sự kiện
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <Input.Search
            style={{ width: "300px" }}
            placeholder="Tìm kiếm theo số vé"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div>
            <Space>
              <Button
                icon={<FilterOutlined />}
                className="btn__style"
                onClick={handleShowModal}
              >
                Lọc vé
              </Button>
              <Button
                className="btn__style"
                onClick={() => exportToExcel(data, "data")}
              >
                Xuất file(.xlsx)
              </Button>
            </Space>
            <Modal
              visible={showModal}
              onCancel={() => setShowModal(false)}
              onOk={handleFilterSubmit}
              okText="Lọc"
              className="custom__modal"
            >
              <h1 style={{ textAlign: "center" }}>Lọc vé</h1>

              <Form
                layout="vertical"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Form.Item label="Từ ngày">
                    <DatePicker
                      className="custom__datepicker"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Đến ngày">
                    <DatePicker
                      className="custom__datepicker"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </div>
              </Form>

              <Form layout="vertical">
                <Form.Item label="Tình trạng sử dụng">
                  <Radio.Group
                    style={{ display: "flex", justifyContent: "space-between" }}
                    value={usageStatus}
                    onChange={(e) => setUsageStatus(e.target.value)}
                  >
                    <Radio value={null}>Tất cả</Radio>
                    <Radio value="Đã sử dụng">Đã sử dụng</Radio>
                    <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
                    <Radio value="Hết hạn">Hết hạn</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>

              <Form layout="vertical">
                <Form.Item label="Cổng Check - in">
                  <Checkbox>Tất cả</Checkbox>
                  <Checkbox.Group
                    style={{ display: "flex", justifyContent: "space-between" }}
                  ></Checkbox.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>

        {renderTable()}
      </Card>
    </div>
  );
};

export default ManageTicket;
