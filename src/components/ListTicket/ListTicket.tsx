import { EditOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  TimePicker,
} from "antd";
import { useState, useEffect } from "react";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchDataPackage } from "../../redux/features/listPackageSlice";
import moment, { Moment } from "moment";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { firestore } from "../../firebase/config";
interface Package {
  codePackage: string;
  namePackage: string;
  startDate: firebase.firestore.Timestamp | null;
  endDate: firebase.firestore.Timestamp | null;
  priceTicket: number;
  priceCombo: number;
  status: boolean;
}

const ListTicket = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.packages.packages);
  useEffect(() => {
    dispatch(fetchDataPackage());
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: "Mã gói",
      dataIndex: "packageCode",
    },
    {
      title: "Tên gói vé",
      dataIndex: "packageName",
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "startDate",
      render: (dateStart: number) =>
        moment(dateStart).format("DD/MM/YYYY HH:mm:ss"), // Sử dụng moment để định dạng và hiển thị ngày tháng
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "endDate",
      render: (endDate: number) =>
        moment(endDate).format("DD/MM/YYYY HH:mm:ss"), // Sử dụng moment để định dạng và hiển thị ngày tháng
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
      render: (status: boolean) =>
        status ? (
          <Tag color="green">
            <Badge color="green" style={{ margin: "0 5px" }} />
            Đang áp dụng
          </Tag>
        ) : (
          <Tag color="red">
            <Badge color="red" style={{ margin: "0 5px" }} />
            Tắt
          </Tag>
        ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: () => <Button icon={<EditOutlined />}>Cập nhật</Button>,
    },
  ];

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

            <Modal
              visible={showModal}
              width={600}
              okText="Lưu"
              cancelText="Hủy"
              className="custom__modal"
              onCancel={() => setShowModal(false)}
            >
              <div className="d-flex justify-content-center">Thêm gói vé</div>
              <Row>
                <Form layout="vertical">
                  <Form.Item
                    label="Mã gói vé"
                    name="packageName"
                    rules={[
                      { required: true, message: "Vui lòng nhập mã gói vé!" },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tên gói vé"
                      className="input__package"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tên gói vé"
                    name="packageName"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên gói vé!" },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tên gói vé"
                      className="input__package"
                    />
                  </Form.Item>
                </Form>
              </Row>
              <Row>
                <Col>
                  <Form layout="vertical">
                    <Form.Item
                      label="Ngày áp dụng"
                      name="dateRange"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày áp dụng!",
                        },
                      ]}
                    >
                      <Space>
                        <DatePicker
                          placeholder="dd/mm/yy"
                          format={"DD/MM/YYYY"}
                          className="picker_style"
                        />
                        <TimePicker
                          placeholder="hh/mm/ss"
                          className="picker_style"
                        />
                      </Space>
                    </Form.Item>
                  </Form>
                </Col>
                <Col className="ms-3">
                  <Form layout="vertical">
                    <Form.Item
                      label="Ngày hết hạn"
                      name="dateRange"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày hết hạn!",
                        },
                      ]}
                    >
                      <Space>
                        <DatePicker
                          placeholder="dd/mm/yy"
                          format={"DD/MM/YYYY"}
                          className="picker_style"
                        />
                        <TimePicker
                          placeholder="hh/mm/ss"
                          className="picker_style"
                        />
                      </Space>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Form layout="vertical">
                  <Form.Item
                    label="Giá vé áp dụng"
                    name="priceTicket"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá vé áp dụng!",
                      },
                    ]}
                  >
                    <Checkbox>
                      Vé lẻ (vnđ/vé) với giá{" "}
                      <Input className="w-25" placeholder="Giá vé" />/ vé
                    </Checkbox>
                    <Checkbox className="mt-3">
                      Combo vé với giá{" "}
                      <Input className="w-25" placeholder="Giá vé" />
                      / <Input className="w-25" placeholder="Giá vé" /> / vé
                    </Checkbox>
                  </Form.Item>
                </Form>
              </Row>
              <Row>
                <Form layout="vertical">
                  <Form.Item
                    label="Tình trạng"
                    name="status"
                    rules={[
                      { required: true, message: "Vui lòng chọn tình trạng!" },
                    ]}
                  >
                    <Select className="custom__select">
                      <Select.Option value={true}>Đang hoạt động</Select.Option>
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
