import React, { useState, useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
  Space,
  Table,
  Tag,
} from "antd";
import { FilterOutlined, MoreOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Ticket, fetchTicketData } from "../../redux/features/ticketSlice";
import { exportToExcel } from "./exportExcel";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import "./ticket.css";
import { rowClassName } from "../../components/StripedTable";
import dayjs, { Dayjs } from "dayjs";
interface State {
  searchText: string;
  usageStatus: string;
  showModal: boolean;
  showModalAction: boolean;
  selectedPackage: string | null;
  selectedTicket: Ticket | null;
  selectedCheckboxes: CheckboxValueType[];
  appliedUsageStatus: string;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  filteredData: Ticket[];
}

const ManageTicket = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.tickets.tickets);
  const [searchText, setSearchText] = useState("");
  const [usageStatus, setUsageStatus] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showModalAction, setShowModalAction] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    CheckboxValueType[]
  >([]);
  const [appliedUsageStatus, setAppliedUsageStatus] = useState<string>("");
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [filteredData, setFilteredData] = useState<Ticket[]>([]);
  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.includes("all")) {
      setSelectedCheckboxes(["all"]);
    } else {
      setSelectedCheckboxes(checkedValues.filter((value) => value !== "all"));
    }
    setSelectedCheckboxes(checkedValues);
  };

  // column table
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
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (_: any, record: any) => (
        <Dropdown
          overlay={renderMenu(record)}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
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
      dataIndex: "eventName",
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
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (_: any, record: Ticket) => (
        <Dropdown
          overlay={renderMenu(record)}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  const renderMenu = (record: Ticket) => (
    <Menu>
      <Menu.Item key="usage">Sử dụng vé</Menu.Item>
      <Menu.Item key="edit" onClick={() => handleEdit(record)}>
        Đổi ngày sử dụng
      </Menu.Item>
      {/* Add more menu items as needed */}
    </Menu>
  );
  //end column table

  // fetch data from firebase
  useMemo(() => {
    const fetchData = async () => {
      await dispatch(fetchTicketData());
    };
    fetchData();
  }, [dispatch]);
  const familyPackages = data.filter(
    (ticket) => ticket.packageType === "Gói gia đình"
  );

  const eventPackages = data.filter(
    (ticket) => ticket.packageType === "Gói sự kiện"
  );

  const handleShowModal = () => {
    setShowModal(true);
  };
  // Function to apply all filters
  const applyFilters = () => {
    let filteredData = searchData();

    if (selectedCheckboxes.length > 0 && !selectedCheckboxes.includes("all")) {
      filteredData = filteredData.filter((ticket) =>
        selectedCheckboxes.includes(ticket.checkinGate as CheckboxValueType)
      );
    }

    if (usageStatus) {
      filteredData = filteredData.filter(
        (ticket) => ticket.usageStatus === usageStatus
      );
    }

    if (fromDate) {
      const fromDateString = dayjs(fromDate).format("DD/MM/YYYY");
      filteredData = filteredData.filter(
        (ticket) => ticket.dateUsage >= fromDateString
      );
    }

    if (toDate) {
      const toDateString = dayjs(toDate).format("DD/MM/YYYY");
      filteredData = filteredData.filter(
        (ticket) => ticket.dateUsage <= toDateString
      );
    }

    return filteredData;
  };

  const handleFilterSubmit = () => {
    // Update the fromDate and toDate states
    setUsageStatus(usageStatus);
    console.log(usageStatus);
    setFromDate(fromDate);
    setToDate(toDate);

    setFilteredData(applyFilters());
    setShowModal(false);
  };

  const handleEdit = (record: Ticket) => {
    setSelectedTicket(record);
    console.log(record);
    setShowModalAction(true);
  };

  // search
  const searchData = () => {
    let filteredData = [];

    if (selectedPackage === "Gói gia đình") {
      filteredData = familyPackages;
    } else if (selectedPackage === "Gói sự kiện") {
      filteredData = eventPackages;
    } else {
      filteredData = data;
    }

    if (searchText !== "") {
      filteredData = filteredData.filter(
        (ticket: any) =>
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
          dataSource={filteredData.length > 0 ? filteredData : familyPackages}
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
          dataSource={filteredData.length > 0 ? filteredData : eventPackages}
          rowClassName={rowClassName}
          bordered
          size="small"
          pagination={{ position: ["bottomCenter"] }}
        />
      );
    }

    return (
      <Table
        columns={familyPackageColumns}
        dataSource={filteredData.length > 0 ? filteredData : searchData()}
        rowClassName={rowClassName}
        bordered
        size="small"
        pagination={{ position: ["bottomCenter"] }}
      />
    );
  };

  return (
    <div>
      <Card className="card__style_">
        <div>
          <h4 className="mb-4 fw-bold">Danh sách vé</h4>
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
        <div className="modal__custom">
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
              <h5 className="text-center fw-bold">Lọc vé</h5>

              <Form layout="vertical" className="raido__custom">
                <div>
                  <Form.Item label="Từ ngày">
                    <DatePicker
                      className="custom__datepicker"
                      format="DD/MM/YYYY"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Đến ngày">
                    <DatePicker
                      className="custom__datepicker"
                      format="DD/MM/YYYY"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </Form.Item>
                </div>
              </Form>

              <Form layout="vertical">
                <Form.Item label="Tình trạng sử dụng">
                  <Radio.Group
                    className="radio__custom"
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

              <div className="d-flex flex-wrap justify-content-between">
                <Checkbox.Group
                  value={selectedCheckboxes}
                  onChange={handleCheckboxChange}
                >
                  <div className="row">
                    <Checkbox className="item" value="all">
                      Tất cả
                    </Checkbox>
                    <Checkbox className="item" value="Cổng 1">
                      Cổng 1
                    </Checkbox>
                    <Checkbox className="item" value="Cổng 2">
                      Cổng 2
                    </Checkbox>
                  </div>
                  <div className="row">
                    <Checkbox className="item" value="Cổng 3">
                      Cổng 3
                    </Checkbox>
                    <Checkbox className="item" value="Cổng 4">
                      Cổng 4
                    </Checkbox>
                    <Checkbox className="item" value="Cổng 5">
                      Cổng 5
                    </Checkbox>
                  </div>
                </Checkbox.Group>
              </div>
            </Modal>
          </div>
        </div>

        {renderTable()}
      </Card>
      <Modal
        visible={showModalAction}
        onCancel={() => setShowModalAction(false)}
        className="modal__btn"
        okText="Lưu"
        cancelText="Hủy"
      >
        <div>
          <h6 className="text-center">Đổi ngày sử dụng vé</h6>
          {selectedTicket && (
            <div className="d-flex">
              <div className="d-flex flex-column">
                <p>Mã vé</p>
                <p>Số vé</p>
                <p>Tên sự kiện</p>
                <p>Hạn sử dụng</p>
              </div>
              <div
                className="d-flex flex-column"
                style={{ marginLeft: "80px" }}
              >
                <p>{selectedTicket.bookingCode}</p>
                <p>Vé cổng - Gói sự kiện</p>
                <p>{selectedTicket.eventName}</p>
                <p>
                  <DatePicker />
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ManageTicket;
