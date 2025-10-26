import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeHolding } from '@/store/portfolio/portfolioSlice';
import { Holding } from '@/types/portfolio';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface HoldingsTableProps {
  onEditHolding?: (holding: Holding) => void;
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({ onEditHolding }) => {
  const { holdings } = useSelector((state: RootState) => state.portfolio);
  const dispatch = useDispatch();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [holdingToDelete, setHoldingToDelete] = useState<Holding | null>(null);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (percentage: number): string => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const handleDeleteClick = (holding: Holding) => {
    setHoldingToDelete(holding);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (holdingToDelete) {
      dispatch(removeHolding(holdingToDelete.id));
      setHoldingToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      STOCKS: 'bg-blue-100 text-blue-800',
      BONDS: 'bg-green-100 text-green-800',
      ETF: 'bg-purple-100 text-purple-800',
      CRYPTO: 'bg-orange-100 text-orange-800',
      COMMODITIES: 'bg-yellow-100 text-yellow-800',
      REAL_ESTATE: 'bg-red-100 text-red-800',
      CASH: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (holdings.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-lg">No holdings found</p>
        <p className="text-sm">Start by adding your first investment</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Avg. Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">Market Value</TableHead>
              <TableHead className="text-right">Gain/Loss</TableHead>
              <TableHead className="text-right">Return %</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings.map((holding) => {
              const currentPrice = holding.currentPrice ?? holding.averagePrice;
              const gainLoss = (currentPrice - holding.averagePrice) * holding.quantity;
              const gainLossPercentage = ((currentPrice - holding.averagePrice) / holding.averagePrice) * 100;
              const marketValue = currentPrice * holding.quantity;
              
              return (
                <TableRow key={holding.id}>
                  <TableCell className="font-medium">{holding.symbol}</TableCell>
                  <TableCell>{holding.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getCategoryColor(holding.category)}>
                      {holding.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{holding.quantity.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{formatCurrency(holding.averagePrice)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(currentPrice)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(marketValue)}</TableCell>
                  <TableCell className={`text-right font-medium ${
                    gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <div className="flex items-center justify-end gap-1">
                      {gainLoss >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {formatCurrency(Math.abs(gainLoss))}
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    gainLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(gainLossPercentage)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onEditHolding?.(holding)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(holding)}
                          className="cursor-pointer text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete holding?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {holdingToDelete?.symbol} - {holdingToDelete?.name}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HoldingsTable;