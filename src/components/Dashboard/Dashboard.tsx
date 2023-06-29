import { Card, Progress } from "antd";
import './dashboard.css'

const Dashboard = () => {
  const data1 = 60;
  const data2 = 40;
  return (
    
    <div>
      <Card className="card__style">
        <section>
          <h1>Thống kê</h1>
          this is chart 
        </section>

        <div>
          <Progress type="circle" percent={data1}  format={() => `${data1}%`} />
          <Progress type="circle" percent={data2}  format={() => `${data2}%`} />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
