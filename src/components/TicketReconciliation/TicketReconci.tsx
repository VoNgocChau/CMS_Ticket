import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import "./style.css";
import { Button, Card, DatePicker, Form, Input, Radio } from "antd";
interface DataType {
  key: React.Key;
  numberTicket: number;
  usageDate: string;
  ticketTypeName: string;
  checkinGate: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: "Số vé",
    dataIndex: "numberTicket",
  },
  {
    title: "Ngày sử dụng",
    dataIndex: "numberTicket",
  },
  {
    title: "Tên loại vé",
    dataIndex: "numberTicket",
  },
  {
    title: "Cổng check - in",
    dataIndex: "numberTicket",
  },
];

const data: DataType[] = [
  {
    key: 1,
    numberTicket: 141291,
    usageDate: "20/11/2018",
    ticketTypeName: "vé cổng",
    checkinGate: "cổng 1",
  },
];
const TicketReconci = () => {
  const rowClassName = (record: DataType, index: number): string => {
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
      <Card style={{ width: "500px",height: '580px', margin: "0 20px" }}>
            <h1>Lọc vé</h1>
            <Form.Item label="Tình trạng đối soát">
                <Radio.Group>
                <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Đã đối soát</Radio>
                    <Radio value={3}>Chưa đối soát</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Loại vé">
                <p style={{margin: '0 35%'}}>Vé cổng</p>
            </Form.Item>
            <Form.Item label="Từ ngày">
                <DatePicker style={{margin: '0 35%'}}  format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item label="Đến ngày">
                <DatePicker style={{margin: '0 35%'}} format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                <Button className="btn__loc">Lọc</Button>
            </Form.Item>
            
      </Card>
        </Form>
    </div>
  );
};

export default TicketReconci;
