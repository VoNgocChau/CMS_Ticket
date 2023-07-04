import Table from "antd/es/table";
import React,{useEffect} from "react";
import "./style.css";
import { Button, Card, DatePicker, Form, Input, Radio } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchDataReconciliation } from "../../redux/reconciliation_ticketSlice";


const columns = [
  {
    title: "STT",
    dataIndex: "key",
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
    dataIndex: "",
    render: () => <i>Chưa đối soát</i>,
  },
];

const TicketReconci = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.reconciliation.tickets);

  useEffect(() => {
    dispatch(fetchDataReconciliation())
  }, [dispatch]);
  const rowClassName = (record: any, index: number): string => {
    if (index % 2 === 1) {
      return "table-row-striped";
    }
    return "";
  };
  return (
    <div style={{ display: "flex" }}>
      <Card style={{ width: "1150px", height: "580px", margin: "0 30px" }}>
        <div>
          <h1>Đối soát vé</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <Input.Search
            placeholder="Tìm bằng số vé"
            style={{ width: "300px" }}
          />
          <Button className="btn__custom">Chốt đối soát</Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          pagination={{ position: ["bottomCenter"] }}
          rowClassName={rowClassName}
        />
      </Card>
      <Form layout="horizontal">
        <Card style={{ width: "350px", height: "580px", margin: "0 10px" }}>
          <h5>Lọc vé</h5>
          <Form.Item label="Tình trạng đối soát">
            <Radio.Group
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "6px 5px ",
              }}
            >
              <Radio value={1}>Tất cả</Radio>
              <Radio value={2}>Đã đối soát</Radio>
              <Radio value={3}>Chưa đối soát</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Loại vé">
            <p style={{ margin: "0 35%" }}>Vé cổng</p>
          </Form.Item>
          <Form.Item label="Từ ngày">
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item label="Đến ngày">
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button className="btn__loc">Lọc</Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default TicketReconci;
