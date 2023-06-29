import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Table,
  Tag,
} from "antd";
import "./ticket.css";
import { ColumnsType } from "antd/es/table";
import { FilterOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";

interface DataType {
  key: React.Key;
  bookingCode: string;
  numberTicket: number;
  usageStatus: string;
  dateOfUse: string;
  dateOfIssue: string;
  checkinGate: string;
}

interface CheckboxOption {
  label: string;
  value: CheckboxValueType;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: "Booking Code",
    dataIndex: "bookingCode",
  },
  {
    title: "Số vé",
    dataIndex: "numberTicket",
  },
  {
    title: "Tình trạng sử dụng",
    dataIndex: "usageStatus",
    render: (usageStatus: string) => {
      let tagColor = "";
      let badgeStatus = "";

      switch (usageStatus) {
        case "Đã sử dụng":
          tagColor = "green";
          badgeStatus = "Đã sử dụng";
          break;
        case "Chưa sử dụng":
          tagColor = "blue";
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
    dataIndex: "dateOfUse",
  },
  {
    title: "Ngày xuất vé",
    dataIndex: "dateOfIssue",
  },
  {
    title: "Cổng check-in",
    dataIndex: "checkinGate",
  },
];
const data: DataType[] = [
  {
    key: "1",
    bookingCode: "ALJLFA",
    numberTicket: 14719841,
    usageStatus: "Đã sử dụng",
    dateOfUse: "25/10/2003",
    dateOfIssue: "29/06/2023",
    checkinGate: "Cổng 1",
  },
  {
    key: "2",
    bookingCode: "ALJLFA",
    numberTicket: 14719841,
    usageStatus: "Chưa sử dụng",
    dateOfUse: "25/10/2003",
    dateOfIssue: "29/06/2023",
    checkinGate: "Cổng 1",
  },
  {
    key: "3",
    bookingCode: "ALJLFA",
    numberTicket: 14719841,
    usageStatus: "Hết hạn",
    dateOfUse: "25/10/2003",
    dateOfIssue: "29/06/2023",
    checkinGate: "Cổng 1",
  },
  {
    key: "4",
    bookingCode: "ALJLFA",
    numberTicket: 14719841,
    usageStatus: "Đã sử dụng",
    dateOfUse: "25/10/2003",
    dateOfIssue: "29/06/2023",
    checkinGate: "Cổng 1",
  },
];

const ManageTicket = () => {
  const rowClassName = (record: DataType, index: number): string => {
    if (index % 2 === 1) {
      return "table-row-striped";
    }
    return "";
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleFilterSubmit = () => {
    // Perform filtering logic based on the selected options
    // Close the filter modal
    setShowModal(false);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  //Checkbox
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedList(checkedValues as number[]);
    setCheckAll(checkedValues.length === checkboxOptions.length);
  };

  const handleCheckAllChange = (e: CheckboxChangeEvent) => {
    const allValues = checkboxOptions.map((option) => option.value);
    setCheckedList(e.target.checked ? allValues : []);
    setCheckAll(e.target.checked);
  };

  const checkboxOptions: CheckboxOption[] = [
    { label: "Cống 1", value: 2 },
    { label: "Cổng 2", value: 3 },
    { label: "Cổng 3", value: 4 },
    { label: "Cổng 4", value: 5 },
    { label: "Cổng 5", value: 6 },
  ];

  const isCheckAll = checkedList.length === checkboxOptions.length;
  const isIndeterminate =
    checkedList.length > 0 && checkedList.length < checkboxOptions.length;
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
            placeholder="Tìm bằng số vé"
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
              <Button className="btn__style">Xuất file(.csv)</Button>
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
                      onChange={onChange}
                      className="custom__datepicker"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Đến ngày">
                    <DatePicker
                      onChange={onChange}
                      className="custom__datepicker"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </div>
              </Form>
              {/* Add your filter form elements here */}
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
                  <Checkbox
                    indeterminate={isIndeterminate}
                    onChange={handleCheckAllChange}
                    checked={isCheckAll}
                  >
                    Tất cả
                  </Checkbox>
                  <Checkbox.Group
                    style={{ display: "flex", justifyContent: "space-between" }}
                    value={checkedList}
                    onChange={handleCheckboxChange}
                  >
                    {checkboxOptions.map((option) => (
                      <Checkbox
                        key={option.value.toString()}
                        value={option.value}
                        disabled={isCheckAll}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={{ position: ["bottomCenter"] }}
          rowClassName={rowClassName}
        />
      </Card>
    </div>
  );
};

export default ManageTicket;
