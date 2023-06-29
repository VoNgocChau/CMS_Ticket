import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Input, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {useState} from 'react'

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

            <Modal visible={showModal}></Modal>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default ListTicket;
