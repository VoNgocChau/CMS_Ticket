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

const columns = [
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

const ManageTicket = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.tickets.tickets) as Ticket[];
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchTicketData());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);

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

  return (
    <div>
      <Card className="card__style">
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
                  >
                    <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Đã sử dụng</Radio>
                    <Radio value={3}>Chưa sử dụng</Radio>
                    <Radio value={4}>Hết hạn</Radio>
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

        <Table
          columns={columns}
          dataSource={searchDevices()}
          bordered
          size="middle"
          pagination={{ position: ["bottomCenter"] }}
          rowClassName={rowClassName}
        />
      </Card>
    </div>
  );
};

export default ManageTicket;
