import Table, { ColumnsType } from 'antd/es/table';
import React from 'react'
import './style.css'
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
        render: (text, record, index) => `${index + 1}`
    },
    {
        title: "Số vé",
        dataIndex: 'numberTicket'
    },
    {
        title: "Ngày sử dụng",
        dataIndex: 'numberTicket'
    },
    {
        title: "Tên loại vé",
        dataIndex: 'numberTicket'
    },
    {
        title: "Cổng check - in",
        dataIndex: 'numberTicket'
    },
];

const data: DataType[] = [
    {
        key: 1,
        numberTicket: 141291,
        usageDate: '20/11/2018',
        ticketTypeName: 'vé cổng',
        checkinGate: 'cổng 1'
    }
]
const TicketReconci = () => {
    const rowClassName = (record: DataType, index: number): string => {
        if (index % 2 === 1) {
          return "table-row-striped";
        }
        return "";
      };
  return (
    <div>

        <Table columns={columns} dataSource={data} size='small' pagination={{position: ['bottomCenter']}} rowClassName={rowClassName}/>
    </div>
  )
}

export default TicketReconci