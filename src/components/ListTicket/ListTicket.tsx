import { EditOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Space, Table, TimePicker } from "antd";
import { ColumnsType } from "antd/es/table";
import {useState} from 'react'
import './style.css'

interface DataType {
  key: React.Key;
  packageCode: string;
  pagkageName: string;
  dateApplication: string;
  dateEnd: string;
  priceTicket: number;
  priceCombo: number;
  status: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: "Mã gói",
    dataIndex: "packageCode",
  },
  {
    title: "Tên gói vé",
    dataIndex: "pagkageName",
  },
  {
    title: "Ngày áp dụng",
    dataIndex: "dateApplication",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "dateEnd",
  },
  {
    title: "Giá vé (VNĐ/Vé)",
    dataIndex: "priceTicket",
  },
  {
    title: "Giá combo (VNĐ/Combo)",
    dataIndex: "priceCombo",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (status ? "Hoạt động" : "Ngừng hoạt động"),
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
    render: (text, record) => (
      <Button icon={<EditOutlined />} >
        Cập nhật
      </Button>
    ),
  },
];

const data: DataType[] = [
  {
    key: 1,
    packageCode: "1NAH414JH",
    pagkageName: "Gói gia đình",
    dateApplication: "25/10/2003",
    dateEnd: "25/10/2900",
    priceTicket: 90000,
    priceCombo: 90000,
    status: true,
  },
];
const ListTicket = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Card>
        <div>
          <h1>Danh sách gói vé</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Tìm bằng số vé"
            style={{ width: "350px" }}
          />
          <div>
            <Button>Xuất file (.csv)</Button>
            <Button onClick={() => setShowModal(true)}>Thêm gói vé</Button>

            <Modal visible={showModal} width={600} okText="Lưu" cancelText="Hủy" className="custom__modal" onCancel={() => setShowModal(false)}>
              <div className="d-flex justify-content-center">Thêm gói vé</div>
              <Row>
                <Form layout="vertical">
                  <Form.Item label = "Tên gói vé">
                    <Input placeholder="Nhập tên gói vé" className="input__package"/>
                  </Form.Item>
                </Form>
              </Row>
              <Row>
                <Col>
                  <Form layout="vertical">
                    <Form.Item label = "Ngày áp dụng">
                      <Space>
                      <DatePicker placeholder="dd/mm/yy" format={'DD/MM/YYYY'}  className="picker_style"/>
                      <TimePicker placeholder="hh/mm/ss" className="picker_style"/>
                      </Space>
                    </Form.Item>
                  </Form>
                </Col>
                <Col className="ms-3">
                  <Form layout="vertical">
                    <Form.Item label = "Ngày hết hạn">
                      <Space>
                      <DatePicker placeholder="dd/mm/yy" format={'DD/MM/YYYY'} className="picker_style"/>
                      <TimePicker placeholder="hh/mm/ss" className="picker_style"/>
                      </Space>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Form layout="vertical">
                  <Form.Item label ="Giá vé áp dụng">
                    <Checkbox>
                      Vé lẻ (vnđ/vé) với giá <Input className="w-25" placeholder="Giá vé"/> / vé
                    </Checkbox>
                    <Checkbox className="mt-3">
                      Combo vé với giá <Input className="w-25" placeholder="Giá vé"/> / <Input className="w-25" placeholder="Giá vé"/> / vé
                    </Checkbox>
                  </Form.Item>
                </Form>
              </Row>
              <Row>
                <Form layout="vertical">
                  <Form.Item label="Tình trạng">
                    <Select className="custom__select">
                      <Select.Option>Đang hoạt động</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <span className="dot__custom">*</span>
                    <span className="text__custom">Là thông tin bắt buộc</span>
                  </Form.Item>
                </Form>
              </Row>
            </Modal>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default ListTicket;
