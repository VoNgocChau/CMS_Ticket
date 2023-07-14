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
import {
  ListPackage,
  addPackage,
  editPackage,
  fetchDataPackage,
  selectPackages,
} from "../../redux/features/listPackageSlice";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { rowClassName } from "../StripedTable";

const ListTicket = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.packages.packages);
  const selectedId = useAppSelector((state) => state.packages.selectedPackage);
  const selectedPackages = useAppSelector((state) =>
    state.packages.packages.find((packages) => packages.id === selectedId)
  );
  const [searchText, setSearchText] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    dispatch(fetchDataPackage());
  }, [dispatch]);

  //add
  const handleAddPackage = async (values: ListPackage) => {
    const { priceTicket, priceCombo, numCombo } = values;
    const newPackages = {
      ...values,
      dateStart: dayjs(values.dateStart).format("DD/MM/YYYY"),
      dateEnd: dayjs(values.dateEnd).format("DD/MM/YYYY"),
      priceTicket: priceTicket !== undefined ? priceTicket : 0,
      priceCombo: priceCombo !== undefined ? priceCombo : 0,
      numCombo: numCombo !== undefined ? numCombo : 0,
    };

    try {
      dispatch(addPackage(newPackages));
      form.resetFields();
      console.log(newPackages);
    } catch (err) {}
  };

  //update
  const handleUpdatePackage = (values: any) => {
    if (selectedPackages) {
      const updatePackages = {
        ...selectedPackages,
        packageCode: values.packageCode,
        packageName: values.packageName,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        priceTicket: values.priceTicket,
        priceCombo: values.priceCombo,
        numCombo: values.numCombo,
        status: values.status,
      };
      dispatch(editPackage(updatePackages));
      setShowModal(false);
      console.log(updatePackages);
    } else {
      console.log("error");
    }
  };

  const handleIdPackge = (id: string) => {
    dispatch(selectPackages(id));
    setShowModal(true);
    console.log(id);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isUpdateMode) {
      form.submit();
    } else {
      handleAddPackage(form.getFieldsValue()); // Gọi handleAddPackage và chuyển giá trị values từ form
    }
  };

  const handleShowModal = () => {
    form.resetFields();
    setIsUpdateMode(false);
    setShowModal(true);
  };

  // export CSV file
  const exportToCSV = () => {
    const csv = Papa.unparse(data);
    const blobParts: BlobPart[] = [csv];
    const blob = new Blob(blobParts, { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv");
  };

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
      dataIndex: "dateStart",
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

      render: (text: any, record: ListPackage) => (
        <div>
          <span>{record.priceCombo} VNĐ</span>

          <span>/{record.numCombo} Vé</span>
        </div>
      ),
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
      title: "",
      dataIndex: "",
      key: "actions",
      render: (record: any) => (
        <Button
          icon={<EditOutlined />}
          type="text"
          style={{ color: "#ff993b" }}
          onClick={() => {
            setIsUpdateMode(true);
            setShowModal(true);
          }}
        >
          Cập nhật
        </Button>
      ),
    },
  ];
  const pageSize = 5;

  // search
  const searchDevices = () => {
    let filteredData = data;

    if (searchText !== "") {
      filteredData = filteredData.filter(
        (ticket) =>
          ticket.packageCode &&
          ticket.packageCode.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filteredData.map((item, idx) => ({
      ...item,
      key: idx + 1,
    }));
  };

  return (
    <div>
      <Card className="card__custom">
        <div>
          <h4 className="mb-4 fw-bold">Danh sách gói vé</h4>
        </div>
        <div className="content__main">
          <Input.Search
            placeholder="Tìm bằng mã gói"
            className="input__custom"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div>
            <Space className="mb-4">
              <Button onClick={exportToCSV} className="btn__custom_border">
                Xuất file (.csv)
              </Button>
              <Button
                onClick={() => {
                  handleShowModal();
                }}
                className="btn__custom"
              >
                Thêm gói vé
              </Button>
            </Space>

            <Modal
              visible={showModal}
              width={600}
              okText={isUpdateMode ? "Cập nhật" : "Lưu"}
              cancelText="Hủy"
              className="custom__modal"
              onCancel={() => setShowModal(false)}
              onOk={handleOk}
            >
              <div className="d-flex justify-content-center">
                {isUpdateMode ? "Cập nhật thông tin gói vé" : "Thêm gói vé"}
              </div>

              <Form
                layout="vertical"
                form={form}
                onFinish={handleUpdatePackage}
              >
                <div className="d-flex justify-content-between">
                  <Form.Item
                    label="Mã gói vé"
                    name="packageCode"
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
                </div>
                <div className="d-flex justify-content-between">
                  <Form.Item
                    label="Ngày áp dụng"
                    name="dateStart"
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
                        onChange={(date) =>
                          form.setFieldsValue({ dateStart: date })
                        }
                      />
                      {/* <TimePicker
                          placeholder="hh/mm/ss"
                          className="picker_style"
                        /> */}
                    </Space>
                  </Form.Item>
                  <Form.Item
                    label="Ngày hết hạn"
                    name="dateEnd"
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
                        onChange={(date) =>
                          form.setFieldsValue({ dateEnd: date })
                        }
                      />
                      {/* <TimePicker
                          placeholder="hh/mm/ss"
                          className="picker_style"
                        /> */}
                    </Space>
                  </Form.Item>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-inline-flex">
                    <div className="me-3">Giá vé (vnđ/vé) với giá</div>
                    <div>
                      <Form.Item name="priceTicket">
                        <Input type="number" className="w-100" />
                      </Form.Item>
                    </div>
                    <span className="ms-2">/vé</span>
                  </div>
                  <div className="d-inline-flex">
                    <div className="me-3">Combo vé với giá</div>
                    <div>
                      <Form.Item label="" name="priceCombo">
                        <Input type="number" className="w-100" />
                      </Form.Item>
                    </div>
                    <span className="mx-2">/</span>
                    <Form.Item label="" name="numCombo">
                      <Input type="number" className="w-100" />
                    </Form.Item>
                    <span className="ms-3">/vé</span>
                  </div>
                </div>
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
            </Modal>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={searchDevices()}
          pagination={{ position: ["bottomCenter"], pageSize: pageSize }}
          rowKey={(record) => record.id}
          onRow={(record) => ({
            onClick: () => {
              setIsUpdateMode(true);
              setShowModal(true);

              form.setFieldsValue({
                packageCode: record.packageCode,
                packageName: record.packageName,
                dateStart: record.dateStart,
                dateEnd: record.dateEnd,
                priceTicket: record.priceTicket,
                priceCombo: record.priceCombo,
                numCombo: record.numCombo,
                status: record.status,
              });
              handleIdPackge(record.id);
            },
          })}
          size="small"
          rowClassName={rowClassName}
        />
      </Card>
    </div>
  );
};

export default ListTicket;
