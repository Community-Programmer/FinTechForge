import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BitcoinChart from "@/components/Chart/BitcoinChart";
import StockChart from "@/components/Chart/StockChart";
import StockWatchlist from "@/components/StockWatchlist/StockWatchlist";

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Stock Watchlist */}
      <StockWatchlist />

      {/* Charts */}
      <Tabs defaultValue="crypto" className="space-y-4">
        <TabsList>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
        </TabsList>
        <TabsContent value="crypto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Bitcoin Market</CardTitle>
              <CardDescription>
                Top cryptocurrencies by market cap
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[80vh]">
              <div className="flex justify-center items-center">
                <BitcoinChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SENSEX Stock Market</CardTitle>
              <CardDescription>Top stocks by market cap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center">
                <StockChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
