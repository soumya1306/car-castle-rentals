"use client";

import AdminTitle from "@/components/Admin/AdminTitle";
import { LuCar, LuCrown, LuUsers } from "react-icons/lu";
import React, { useState, useEffect } from "react";
import { getCarCounts } from "@/utils/carUtils";

interface DashboardCard {
  title: string;
  description: string;
  count: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}
  const dashboardCards: DashboardCard[] = [
    {
      title: "Total Cars",
      description: "Number of cars available in the fleet",
      count: 120,
      icon: LuCar,
      color: "text-secondary",
    },
    {
      title: "Premium Cars",
      description: "Number of premium cars available in the fleet",
      count: 30,
      icon: LuCrown,
      color: "text-secondary",
    },
    {
      title: "Regular Cars",
      description: "Number of regular cars available in the fleet",
      count: 90,
      icon: LuUsers,
      color: "text-secondary",
    },
  ];


const DashboardAdmin = () => {
  const [dashboardData, setDashboardData] = useState<DashboardCard[]>(dashboardCards);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCarCounts = async () => {
      try {
        setLoading(true);
        const result = await getCarCounts();
        
        if (result.success) {
          setDashboardData((prevData) =>
            prevData.map((card) => {
              if (card.title === "Total Cars") {
                return { ...card, count: result.counts.total };
              } else if (card.title === "Premium Cars") {
                return { ...card, count: result.counts.premium };
              } else if (card.title === "Regular Cars") {
                return { ...card, count: result.counts.regular };
              }
              return card;
            })
          );
        }
      } catch (error) {
        console.error('Error fetching car counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarCounts();
  }, []);

  return (
    <div className="px-12">
      <AdminTitle
        title="Admin Dashboard"
        subtitle="Seamlessly manage cars, bookings, and customers — all from one smart control hub."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {dashboardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 w-[250px] flex hover:shadow-lg justify-between transition-shadow"
            >
              <div>
                <h2 className="text-gray-600 text-sm">  
                  {card.title}
                </h2>
                <h2 className="text-2xl font-bold ">
                  {loading ? '...' : card.count}
                </h2>
              </div>
              <div className={`${card.color} p-3 rounded-full bg-primary/10`}>
                <IconComponent size={28} className="" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[400px] flex items-center justify-center">
        <AdminTitle title="More Features Coming Soon" />
      </div>
    </div>
  );
};

export default DashboardAdmin;
