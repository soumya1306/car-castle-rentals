import AdminTitle from "@/components/Admin/AdminTitle";
import { LuCar, LuCrown, LuUsers } from "react-icons/lu";
import React from "react";

interface DashboardCard {
  title: string;
  description: string;
  count: number;
  icon: React.ComponentType<any>;
  color: string;
}

const DashboardAdmin = () => {
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

  return (
    <div className="px-12">
      <AdminTitle
        title="Admin Dashboard"
        subtitle="Seamlessly manage cars, bookings, and customers — all from one smart control hub."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {dashboardCards.map((card, index) => {
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
                <h2 className="text-2xl font-bold ">{card.count}</h2>
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
