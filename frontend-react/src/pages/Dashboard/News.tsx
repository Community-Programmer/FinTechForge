import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, Search, ExternalLink, BrainCircuit } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getNews, getNewsSentiment } from "@/api/newsService"

type NewsItem = {
  url: string
  img: string
  title: string
  text: string
  source: string
  type: string
  tickers: string[]
  time: string
  ago: string
  sentiment?: "bullish" | "bearish" | "neutral"
}

export function MarketNews() {
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  useEffect(() => {
    // Simulate fetching data from API
    const fetchNewsData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll use the mock data
        const mockData = await getNews();
        // const mockData = getMockNewsData()
        setNewsData(mockData.data.data.body)
      } catch (error) {
        console.error("Error fetching news data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNewsData()
  }, [])

  const filteredNews = newsData.filter(
    (news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (news.tickers && news.tickers.some((ticker) => ticker.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return <ArrowUpIcon className="h-4 w-4 text-green-500" />
      case "bearish":
        return <ArrowDownIcon className="h-4 w-4 text-red-500" />
      default:
        return <MinusIcon className="h-4 w-4 text-gray-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "bearish":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Market News & Sentiment</h2>
          <p className="text-muted-foreground">Latest financial news with AI-powered sentiment analysis</p>
        </div>
        <div className="w-full md:w-64">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news, sources, tickers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="bullish">Bullish</TabsTrigger>
          <TabsTrigger value="bearish">Bearish</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNews.map((news, index) => (
            <NewsCard
              key={index}
              news={news}
              getSentimentIcon={getSentimentIcon}
              getSentimentColor={getSentimentColor}
            />
          ))}
        </TabsContent>

        <TabsContent value="bullish" className="space-y-4">
          {filteredNews
            .filter((news) => news.sentiment === "bullish")
            .map((news, index) => (
              <NewsCard
                key={index}
                news={news}
                getSentimentIcon={getSentimentIcon}
                getSentimentColor={getSentimentColor}
              />
            ))}
        </TabsContent>

        <TabsContent value="bearish" className="space-y-4">
          {filteredNews
            .filter((news) => news.sentiment === "bearish")
            .map((news, index) => (
              <NewsCard
                key={index}
                news={news}
                getSentimentIcon={getSentimentIcon}
                getSentimentColor={getSentimentColor}
              />
            ))}
        </TabsContent>

        <TabsContent value="neutral" className="space-y-4">
          {filteredNews
            .filter((news) => news.sentiment === "neutral")
            .map((news, index) => (
              <NewsCard
                key={index}
                news={news}
                getSentimentIcon={getSentimentIcon}
                getSentimentColor={getSentimentColor}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NewsCard({
  news,
  getSentimentIcon,
  getSentimentColor,
}: {
  news: NewsItem
  getSentimentIcon: (sentiment: string) => React.ReactNode
  getSentimentColor: (sentiment: string) => string
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiSentiment, setAiSentiment] = useState<string | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)

  const analyzeSentiment = async(newsUrl: string) => {
    setIsModalOpen(true)
    setIsAnalyzing(true)
    setAiSentiment(null)
    setAiAnalysis(null)

    const response = await getNewsSentiment(newsUrl);
    console.log(response.data);

    setAiSentiment(response.data.data.sentiment.toLowerCase())
    setAiAnalysis(response.data.data.reason)
    setIsAnalyzing(false)

    // // Simulate AI analysis with a delay
    // setTimeout(() => {
    //   // Generate a random sentiment for demonstration
    //   const sentiments = ["bullish", "bearish", "neutral"]
    //   const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)]

    //   // Generate a more detailed analysis based on the sentiment
    //   let analysis = ""
    //   if (randomSentiment === "bullish") {
    //     analysis =
    //       "This article contains strong positive indicators suggesting an upward market trend. Key bullish signals include positive earnings reports, strategic acquisitions, and favorable market conditions. Recommend considering this information for potential investment opportunities."
    //   } else if (randomSentiment === "bearish") {
    //     analysis =
    //       "Analysis indicates concerning market signals with potential downside risk. Negative factors include declining revenue projections, increased competition, and unfavorable regulatory developments. Investors should exercise caution when considering positions related to this news."
    //   } else {
    //     analysis =
    //       "The sentiment analysis shows balanced market indicators with no strong directional bias. While there are both positive and negative elements, neither dominates sufficiently to suggest a clear market direction. Recommend monitoring for further developments before making investment decisions."
    //   }

    //   setAiSentiment(randomSentiment)
    //   setAiAnalysis(analysis)
    //   setIsAnalyzing(false)
    // }, 2000)


  }

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {news.img && (
              <div className="md:w-1/5 flex-shrink-0">
                <img
                  src={news.img || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">{news.source}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{news.time}</span>
                <span className="text-sm text-muted-foreground">({news.ago})</span>

                {news.tickers && news.tickers.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {news.tickers.slice(0, 5).map((ticker, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {ticker}
                      </Badge>
                    ))}
                    {news.tickers.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{news.tickers.length - 5} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
              <p className="text-muted-foreground mb-3">{news.text}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    Read More <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
                <Button variant="secondary" size="sm" onClick={()=>analyzeSentiment(news.url)} className="flex items-center gap-1">
                  <BrainCircuit className="h-4 w-4" /> Sentiment AI
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI Sentiment Analysis</DialogTitle>
            <DialogDescription>Analyzing market sentiment for this news article</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-4">
              {news.img && (
                <img
                  src={news.img || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              )}

              <h3 className="text-lg font-semibold">{news.title}</h3>
              <p className="text-sm text-muted-foreground">{news.text}</p>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Source:</span>
                <span className="text-sm text-muted-foreground">{news.source}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Published:</span>
                <span className="text-sm text-muted-foreground">
                  {news.time} ({news.ago})
                </span>
              </div>

              {news.tickers && news.tickers.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Related tickers:</span>
                  <div className="flex flex-wrap gap-1">
                    {news.tickers.map((ticker, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {ticker}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-2">
                <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4" /> AI Sentiment Analysis
                </h4>

                {isAnalyzing ? (
                  <div className="flex items-center gap-2 py-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                    <span>Analyzing sentiment...</span>
                  </div>
                ) : aiSentiment ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Market Sentiment:</span>
                      <Badge className={getSentimentColor(aiSentiment)}>
                        <span className="flex items-center gap-1">
                          {getSentimentIcon(aiSentiment)}
                          {aiSentiment.charAt(0).toUpperCase() + aiSentiment.slice(1)}
                        </span>
                      </Badge>
                    </div>

                    <div>
                      <span className="text-sm font-medium">Analysis:</span>
                      <p className="text-sm mt-1 text-muted-foreground">{aiAnalysis}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Fix: Comment out function to preserve it while avoiding TypeScript error
// This function is preserved for potential future use or as fallback mock data
// To use: uncomment the function and call _getMockNewsData() or getMockNewsData()
/*
function getMockNewsData(): NewsItem[] {
  return [
    {
      url: "https://stockanalysis.com/out/news?url=https://seekingalpha.com/article/4771839-lpl-financial-stock-positioned-accelerate-market-expansion-commonwealth-acquisition",
      img: "https://cdn.snapi.dev/images/v1/n/f/v/bank27-2995741.jpg",
      title: "LPL Financial: Positioned To Accelerate Market Expansion Through Commonwealth Acquisition",
      text: "LPL Financial is the largest independent broker-dealer in the US, with strong financials and a growth strategy focused on M&A and vertical integration. LPLA's FY24 revenues grew 23.20% YoY to $12.39bn...",
      source: "Seeking Alpha",
      type: "Article",
      tickers: ["$LPLA"],
      time: "Mar 31, 2025, 6:25 AM EDT",
      ago: "12 minutes ago",
    },
    {
      url: "https://stockanalysis.com/out/news?url=https://seekingalpha.com/article/4771838-the-cigna-group-compelling-exposure-to-diversified-healthcare-at-a-discount-price",
      img: "https://cdn.snapi.dev/images/v1/z/d/9/insurance4-2995742.jpg",
      title: "The Cigna Group: Compelling Exposure To Diversified Healthcare At A Discount Price",
      text: "Cigna is positioned to benefit from utilization normalization and aims for 10%-14% annual EPS growth by reducing Medicare exposure and improving Commercial business. Despite industry challenges, Cigna...",
      source: "Seeking Alpha",
      type: "Article",
      tickers: ["$CI"],
      time: "Mar 31, 2025, 6:25 AM EDT",
      ago: "12 minutes ago",
    },
    {
      url: "https://www.fxempire.com/forecasts/article/oil-news-wti-bulls-target-70-21-breakout-as-outlook-turns-bullish-on-geopolitical-risks-1508172",
      img: "https://cdn.snapi.dev/images/v1/r/1/p/oil16-2688284-2995745.jpg",
      title: "Oil News: WTI Bulls Target $70.21 Breakout as Outlook Turns Bullish on Geopolitical Risks",
      text: "WTI crude nears key $70.21 resistance as bullish sentiment grows on geopolitical risks and OPEC supply uncertainty. Traders eye potential upside breakout.",
      source: "FXEmpire",
      type: "Article",
      tickers: ["#BNO", "#DBO", "#GUSH", "#IEO", "#OIH", "#PXJ", "#UCO"],
      time: "Mar 31, 2025, 6:24 AM EDT",
      ago: "13 minutes ago",
    },
    {
      url: "https://stockanalysis.com/out/news?url=https://seekingalpha.com/article/4771837-heritage-insurance-stock-insider-buying-strong-growth-low-valuation",
      img: "https://cdn.snapi.dev/images/v1/x/x/i/asset-management11-2995740.jpg",
      title: "Heritage Insurance: Insider Buying, Strong Growth, And Low Valuation",
      text: "Heritage Insurance Holdings is an attractive investment due to its low valuation combined with its strong growth potential. The company's positive Q4 earnings results provide insights into its potenti...",
      source: "Seeking Alpha",
      type: "Article",
      tickers: ["$HRTG", "#DBO", "#GUSH", "#IEO", "#OIH", "#PXJ", "#UCO"],
      time: "Mar 31, 2025, 6:24 AM EDT",
      ago: "13 minutes ago",
    },
    {
      url: "https://invezz.com/news/2025/03/31/nio-stock-price-has-crashed-is-it-safe-to-buy-the-dip/?utm_source=snapi",
      img: "https://cdn.snapi.dev/images/v1/p/h/q/nio10-2771364-2995758.jpg",
      title: "Nio stock price has crashed: is it safe to buy the dip?",
      text: "Nio stock price has imploded this year, and is hovering at its lowest point since 2020 after reporting results that largely missed analysts' estimates. It crashed to a low of $3.75 on Friday, down by ...",
      source: "Invezz",
      type: "Article",
      tickers: ["$NIO", "#DBO", "#GUSH", "#IEO", "#OIH", "#PXJ", "#UCO"],
      time: "Mar 31, 2025, 6:06 AM EDT",
      ago: "31 minutes ago",
    },
    {
      url: "https://www.reuters.com/business/autos-transportation/tesla-deliveries-likely-fell-competition-musk-backlash-surge-2025-03-31/",
      img: "https://cdn.snapi.dev/images/v1/o/g/1/tsla15-2687987-2995725.jpg",
      title: "Tesla deliveries likely fell as competition, Musk backlash surge",
      text: "Tesla investors are bracing for a drop in first-quarter vehicle deliveries as a backlash against CEO Elon Musk's politics exacerbates weakening demand for the electric vehicle maker's aging lineup.",
      source: "Reuters",
      type: "Article",
      tickers: ["$TSLA", "#DBO", "#GUSH", "#IEO", "#OIH", "#PXJ", "#UCO"],
      time: "Mar 31, 2025, 6:01 AM EDT",
      ago: "36 minutes ago",
    },
    {
      url: "https://www.barrons.com/articles/blackrock-stock-fink-letter-esg-d6d5d196",
      img: "https://cdn.snapi.dev/images/v1/e/k/v/asset-management50-2995715.jpg",
      title: "The Most Notable Thing About Larry Fink's Annual Letter is What He Left Unsaid",
      text: "Blackrock CEO's letters can move markets and sway management teams' thinking.",
      source: "Barrons",
      type: "Article",
      tickers: ["$BLK", "#DBO", "#GUSH", "#IEO", "#OIH", "#PXJ", "#UCO"],
      time: "Mar 31, 2025, 6:00 AM EDT",
      ago: "37 minutes ago",
    },
    {
      url: "https://www.wsj.com/finance/investing/larry-fink-says-regular-americans-need-private-assets-too-22a109b7",
      img: "https://cdn.snapi.dev/images/v1/u/f/q/asset-management10-2995737.jpg",
      title: "Larry Fink Says Regular Americans Need Private Assets Too",
      text: "The BlackRock CEO says he wants individuals to have better access to the menu of private and illiquid investments that have long been core holdings of pensions, endowments and other institutions.",
      source: "WSJ",
      type: "Article",
      tickers: ["$BLK", "#DBO", "#GUSH", "#IEO", "#OIH", "#PXJ", "#UCO"],
      time: "Mar 31, 2025, 6:00 AM EDT",
      ago: "37 minutes ago",
    },
    {
      url: "https://www.reuters.com/markets/commodities/washington-tells-repsol-its-license-venezuela-be-revoked-2025-03-31/",
      img: "https://cdn.snapi.dev/images/v1/x/k/h/oil48-2995717.jpg",
      title: "Washington tells Repsol its license in Venezuela to be revoked",
      text: "U.S. authorities have notified Spanish oil company Repsol that its license to export oil from Venezuela is to be revoked, a company spokesperson said on Monday, while Spain's foreign minister promised...",
      source: "Reuters",
      type: "Article",
      tickers: ["$BLK", "#DBO", "#GUSH", "#IEO", "#OIH", "#PXJ", "#UCO"],
      time: "Mar 31, 2025, 5:58 AM EDT",
      ago: "39 minutes ago",
    },
    {
      url: "https://www.benzinga.com/25/03/44556893/loar-holdings-earnings-are-imminent-these-most-accurate-analysts-revise-forecasts-ahead-of-earnings-call?utm_source=snapi",
      img: "https://cdn.snapi.dev/images/v1/u/m/e/aero6-2995727.jpg",
      title:
        "Loar Holdings Earnings Are Imminent; These Most Accurate Analysts Revise Forecasts Ahead Of Earnings Call",
      text: "Loar Holdings Inc. LOAR will release its fourth-quarter financial results, after the closing bell, on Monday, March 31.",
      source: "Benzinga",
      type: "Article",
      tickers: ["$LOAR", "#DBO", "#GUSH", "#IEO", "#OIH", "#PXJ", "#UCO"],
      time: "Mar 31, 2025, 5:56 AM EDT",
      ago: "41 minutes ago",
    },
  ]
}
*/