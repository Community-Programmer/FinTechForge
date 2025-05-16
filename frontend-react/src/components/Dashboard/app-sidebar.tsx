import * as React from "react";
import { AArrowUp, BarChart3, BarChart3Icon, CircleDollarSign, Coins, CreditCard, LayoutDashboard, MessageSquare, Newspaper, TrendingUp } from "lucide-react";
import fintechForgeLogo from '../../assets/fintechforge-logo.png';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "/dashboard",
          icon: LayoutDashboard
        },
        {
          title: "Market News",
          url: "/dashboard/news",
          icon: Newspaper,
        },
        {
          title: "Currency Convertor",
          url: "/dashboard/currencyconvertor",
          icon: CreditCard
        },
        {
          title: "AI Assistant",
          url: "/dashboard/finance-chatbot",
          icon: MessageSquare
        },
        {
          title: "Stock Analysis",
          url: "/dashboard/analysis",
          icon: AArrowUp
        },
      ],
    },
    {
      title: "Market Trends",
      url: "#",
      items: [
        {
          title: "Stock HeatMap",
          url: "/dashboard/stock-heatmap",
          icon: BarChart3Icon
        },
        {
          title: "Crypto HeatMap",
          url: "/dashboard/crypto-heatmap",
          icon: TrendingUp
        },
        {
          title: "ETF HeatMap",
          url: "/dashboard/etf-heatmap",
          icon: CircleDollarSign
        },
        {
          title: "Forex HeatMap",
          url: "/dashboard/forex-heatmap",
          icon: Coins
        }
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
             <img src= {fintechForgeLogo} alt="fintechforge- Logo"/>
            </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center">
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
