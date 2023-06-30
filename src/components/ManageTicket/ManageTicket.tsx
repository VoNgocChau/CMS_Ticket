import React, { useState, useEffect } from "react";
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
import { FilterOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Ticket, fetchTicketData } from "../../firebase/ticketSlice";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface CheckboxOption {
  label: string;
  value: CheckboxValueType;
}

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
  const data = useAppSelector((state) => state.tickets.tickets);

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

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

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

  const exportToExcel = async (data: any, filename: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.values = [
      "STT",
      "Booking Code",
      "Số vé",
      "Tình trạng sử dụng",
      "Ngày sử dụng",
      "Ngày xuất vé",
      "Cổng check-in",
    ];

    worksheet.getColumn("A").width = 10;
    worksheet.getColumn("B").width = 15;
    worksheet.getColumn("C").width = 10;
    worksheet.getColumn("D").width = 15;
    worksheet.getColumn("E").width = 15;
    worksheet.getColumn("F").width = 15;
    worksheet.getColumn("G").width = 15;

    for (let i = 0; i < data.length; i++) {
      const rowData = data[i];
      const row = worksheet.getRow(i + 2);

      row.getCell(1).value = rowData.key;
      row.getCell(2).value = rowData.bookingCode;
      row.getCell(3).value = rowData.numTicket;
      row.getCell(4).value = rowData.usageStatus;
      row.getCell(5).value = rowData.dateUsage;
      row.getCell(6).value = rowData.dateIssue;
      row.getCell(7).value = rowData.checkinGate;
    }

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "EFEFEF" },
        };
      }
    });

    try {
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), `${filename}.xlsx`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  const rowClassName = (record: Ticket, index: number): string => {
    return index % 2 === 1 ? "table-row-striped" : "";
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
