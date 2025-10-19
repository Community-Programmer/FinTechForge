import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AArrowUp, BarChart3Icon, CircleDollarSign, Coins, CreditCard, LayoutDashboard, MessageSquare, Newspaper, TrendingUp } from "lucide-react";
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
  useSidebar,
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
  const navigate = useNavigate();
  const { setOpenMobile, isMobile } = useSidebar();

  // Function to handle navigation and close sidebar on mobile
  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  // Function to handle logo click - navigate to homepage
  const handleLogoClick = () => {
    navigate('/');
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer transition-opacity hover:opacity-80" 
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLogoClick();
            }
          }}
          aria-label="Go to homepage"
        >
          <img src={fintechForgeLogo} alt="FinTechForge Logo"/>
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
                      <Link 
                        to={item.url} 
                        className="flex items-center"
                        onClick={handleNavigation}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                      </Link>
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
