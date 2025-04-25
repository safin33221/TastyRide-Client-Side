import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Title, Tooltip, Legend);

const RestaurantDashboard = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // get the api data for restaurant overview
    const {data: restaurantOverViewData, isLoading, error} = useQuery({
      queryKey: ['restaurantOverViewData'],
      queryFn: async () => {
        const res = await axiosPublic.get(`/api//orders/overview/${user?.email}?date=${selectedDate.toISOString().split('T')[0]}`);
        return res.data;
      }
    })

    const {metrics, charts} = restaurantOverViewData || {};

  if(isLoading){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  // handle error for fatching data
  if (error) {
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to load overview',
      icon: 'error',
      confirmButtonColor: '#ef4444',
    });
    return (
      <div className="alert alert-error max-w-lg mx-auto mt-10">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  // line chart order over time
  const ordersChartData = {
    labels: charts.orderOverOneMonth.map(data => data.date),
    datasets: [
      {
        label: 'Orders',
        data: charts.orderOverOneMonth.map(data => data.count),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2',
        fill: true
      }
    ]
  }

  // line chart order over one week 
  const weekChartData = {
    labels: charts.orderOverOneWeek.map(data => data.date),
    datasets: [
      {
        label: 'Orders',
        data: charts.orderOverOneWeek.map(data => data.count),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2',
        fill: true
      }
    ]
  }

  // bar chart order in a day
  const dayChartData = {
    labels: Array.from({length: 24}, (_, i)=> `${i}:00`),
    datasets: [
      {
        label: 'Orders',
        data: Array.from({lenght: 24}, (_, i) => {
          const hourData = charts.orderOverOneDay.find(d => d.hour === i);
          return hourData? hourData.count : 0;
        }),
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        borderWidth: 1,
      }
    ]
  }


    // Pie Chart: Order Status Distribution
    const statusChartData = {
      labels: charts.statusDistribution.map(s => s.status),
      datasets: [{
        label: "Orders",
        data: charts.statusDistribution.map(s => s.count),
        backgroundColor: ['#ef4444', '#10b981', '#f59e0b', '#3b82f6', '#6b7280'],
        borderColor: '#fff',
        borderWidth: 1,
      }],
     
    }

  // chart options
  const chartOptions = {
    responsive: true, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: ""
      }
    }
  }


  return (
    <div className="py-10 px-4 mx-auto">
       <h1 className="text-3xl font-bold text-primary mb-6">Restaurant Overview</h1>


       {/* matrics */}
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* total order */}
        <div className='card bg-base-100 shadow-xl'>
          <div className="card-body">
            <h2 className='card-title text-primary'>Total Order</h2>
            <p className="text-2xl font-bold">{metrics.totalOrders}</p>
          </div>
        </div>
        {/* total revenue */}
        <div className='card bg-base-100 shadow-xl'>
          <div className="card-body">
            <h2 className='card-title text-primary'>Total Revenue</h2>
            <p className="text-2xl font-bold">{metrics.totalRevenue.toFixed(2)} tk</p>
          </div>
        </div>
        {/* active orders */}
        <div className='card bg-base-100 shadow-xl'>
          <div className="card-body">
            <h2 className='card-title text-primary'>Active Orders</h2>
            <p className="text-2xl font-bold">{metrics.activeOrders}</p>
          </div>
        </div>
        {/* delivered orders  */}
        <div className='card bg-base-100 shadow-xl'>
          <div className="card-body">
            <h2 className='card-title text-primary'>Delivered Orders</h2>
            <p className="text-2xl font-bold">{metrics.deliveredOrders}</p>
          </div>
        </div>
        {/* cancelled orders */}
        <div className='card bg-base-100 shadow-xl'>
          <div className="card-body">
            <h2 className='card-title text-primary'>Cancelled Orders</h2>
            <p className="text-2xl font-bold">{metrics.cancelledOrders}</p>
          </div>
        </div>
       </div>


       {/* charts */}
       <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>

       {/* line chart for one month */}
          <div className='card bg-base-100 shadow-xl p-10'>
          <h2 className="card-title text-primary">Orders Over Time (Last 30 Days)</h2>
          <Line data= {ordersChartData} 
          options={{
            ...chartOptions, 
            plugins: {
              ...chartOptions.plugins,
              title: {
                text: "Order in last 30 days"
              }
            }
          }}
          />
          </div>

          {/* line chart for one week */}
          <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary">Orders Over One Week</h2>
            <Line data={weekChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Orders Over Week' } } }} />
          </div>
        </div>

        {/* order in one day */}
        {/* <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary">Orders in a Day (Hourly)</h2>
            <div className="mb-4">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  queryClient.invalidateQueries(['restaurantOverview']);
                }}
                dateFormat="yyyy-MM-dd"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <Bar data={dayChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: `Orders on ${selectedDate.toISOString().split('T')[0]}` } } }} />
          </div>
        </div> */}


        {/* order status chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary">Order Status Distribution</h2>
            <Pie 
            data={statusChartData} 
            options={{ 
              ...chartOptions, 
              plugins: { 
                ...chartOptions.plugins, 
                title: { text: 'Order Status' } 
              } }} />
          </div>
        </div>
       </div>
    </div>
  );
};

export default RestaurantDashboard;

