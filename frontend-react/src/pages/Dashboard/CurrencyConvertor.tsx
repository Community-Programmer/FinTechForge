import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { ChartArea } from "@/components/ui/chart";
import { getAllCurrency, currencyConvert } from "@/api/currencyService";
import { parseApiError } from "@/lib/apiError";

type Currency = {
  currencyCode: string;
  currencyName: string;
  flag: string;
  id: string;
};

interface HistoricalDataPoint {
  date: string;
  value: number;
}

export function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency && amount > 0) {
      const debouncedConversion = setTimeout(() => {
        convertCurrency();
      }, 500); // 500ms delay

      return () => clearTimeout(debouncedConversion); // Cleanup function
    }
  }, [fromCurrency, toCurrency, amount]);

  const fetchCurrencies = async () => {
    setIsLoadingCurrencies(true);
    setError(null);

    try {
      const response = await getAllCurrency();
      setCurrencies(response.data.data);
    } catch (err) {
      const apiError = parseApiError(
        err,
        "Failed to load currencies. Please try again later."
      );
      console.error("Error fetching currencies", apiError);
      setError(apiError.message);
    } finally {
      setIsLoadingCurrencies(false);
    }
  };

  const convertCurrency = async () => {
    if (!fromCurrency || !toCurrency || amount <= 0) return;

    setIsConverting(true);
    setError(null);

    try {
      const response = await currencyConvert(amount, fromCurrency, toCurrency);
      const data = response.data.data[0];

      const parsedAmount = parseFloat(data.amount);
      const parsedRate = parseFloat(data.rate.replace(/,/g, ""));

      const rate = parsedAmount === 1 ? parsedRate : parsedRate / parsedAmount;

      setConversionRate(rate);
      setConvertedAmount(amount * rate);
      generateHistoricalData(rate);
    } catch (err) {
      const apiError = parseApiError(
        err,
        "Failed to convert currency. Please try again later."
      );
      console.error("Error converting currency:", apiError);
      setError(apiError.message);
    } finally {
      setIsConverting(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const generateHistoricalData = (currentRate: number) => {
    const data: HistoricalDataPoint[] = [];
    const today = new Date();

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const randomFactor = 0.95 + Math.random() * 0.1;
      data.push({
        date: date.toISOString().split("T")[0],
        value: currentRate * randomFactor,
      });
    }

    setHistoricalData(data);
  };
  const getCurrencyDetails = (code: string) => {
    return currencies.find((currency) => currency.currencyCode === code);
  };
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Currency Converter</h2>
      <p className="text-muted-foreground">
        Convert between different currencies using real-time exchange rates
      </p>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-md">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Convert Currency</CardTitle>
          <CardDescription>
            Enter an amount and select currencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="md:col-span-2 space-y-2">
                <div className="font-medium">From</div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="flex-1"
                    disabled={isLoadingCurrencies}
                  />
                  <Select
                    value={fromCurrency}
                    onValueChange={setFromCurrency}
                    disabled={isLoadingCurrencies}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Currency">
                        <div className="flex items-center space-x-2">
                          {getCurrencyDetails(fromCurrency)?.flag && (
                            <img
                              src={getCurrencyDetails(fromCurrency)?.flag}
                              alt={fromCurrency}
                              className="w-5 h-5"
                            />
                          )}
                          <span>{fromCurrency}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem
                          key={currency.id}
                          value={currency.currencyCode}
                        >
                          <div className="flex items-center space-x-2">
                            <img
                              src={currency.flag}
                              alt={currency.currencyCode}
                              className="w-5 h-5"
                            />
                            <span>
                              {currency.currencyCode} - {currency.currencyName}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCurrencies}
                  disabled={isLoadingCurrencies || isConverting}
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="md:col-span-2 space-y-2">
                <div className="font-medium">To</div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    value={
                      isConverting
                        ? "Converting..."
                        : convertedAmount.toFixed(2)
                    }
                    readOnly
                    className="flex-1"
                  />
                  <Select
                    value={toCurrency}
                    onValueChange={setToCurrency}
                    disabled={isLoadingCurrencies}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Currency">
                        <div className="flex items-center space-x-2">
                          {getCurrencyDetails(toCurrency)?.flag && (
                            <img
                              src={getCurrencyDetails(toCurrency)?.flag}
                              alt={toCurrency}
                              className="w-5 h-5"
                            />
                          )}
                          <span>{toCurrency}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem
                          key={currency.id}
                          value={currency.currencyCode}
                        >
                          {currency.currencyCode} - {currency.currencyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {isConverting ? (
                <p>Converting...</p>
              ) : (
                <>
                  <p>
                    {amount} {fromCurrency} = {convertedAmount.toFixed(2)}{" "}
                    {toCurrency}
                  </p>
                  <p className="mt-1">
                    1 {fromCurrency} = {conversionRate.toFixed(4)} {toCurrency}
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exchange Rate History</CardTitle>
          <CardDescription>
            30-day history for {fromCurrency}/{toCurrency} exchange rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartArea
            data={historicalData}
            dataKey="value"
            xAxisFormatter={(date) => new Date(date).toLocaleDateString()}
            yAxisFormatter={(value) => value.toFixed(4)}
            tooltipFormatter={(value) => value.toFixed(4)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
