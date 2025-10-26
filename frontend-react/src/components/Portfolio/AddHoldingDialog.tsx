import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addHolding, updateHolding } from '@/store/portfolio/portfolioSlice';
import { Holding, AssetCategory, AddHoldingFormData } from '@/types/portfolio';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check } from 'lucide-react';

interface AddHoldingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingHolding?: Holding | null;
}

const AddHoldingDialog: React.FC<AddHoldingDialogProps> = ({
  open,
  onOpenChange,
  editingHolding,
}) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState<AddHoldingFormData>({
    symbol: '',
    name: '',
    quantity: 0,
    averagePrice: 0,
    category: AssetCategory.STOCKS,
    sector: '',
    dateAdded: new Date().toISOString().split('T')[0],
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof AddHoldingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens/closes or editing changes
  useEffect(() => {
    if (open) {
      if (editingHolding) {
        setFormData({
          symbol: editingHolding.symbol,
          name: editingHolding.name,
          quantity: editingHolding.quantity,
          averagePrice: editingHolding.averagePrice,
          category: editingHolding.category,
          sector: editingHolding.sector || '',
          dateAdded: editingHolding.dateAdded.split('T')[0],
        });
      } else {
        setFormData({
          symbol: '',
          name: '',
          quantity: 0,
          averagePrice: 0,
          category: AssetCategory.STOCKS,
          sector: '',
          dateAdded: new Date().toISOString().split('T')[0],
        });
      }
      setErrors({});
    }
  }, [open, editingHolding]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AddHoldingFormData, string>> = {};

    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required';
    } else if (formData.symbol.length > 10) {
      newErrors.symbol = 'Symbol must be 10 characters or less';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be 100 characters or less';
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (formData.averagePrice <= 0) {
      newErrors.averagePrice = 'Average price must be greater than 0';
    }

    if (!formData.dateAdded) {
      newErrors.dateAdded = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingHolding) {
        dispatch(updateHolding({
          id: editingHolding.id,
          ...formData,
          dateAdded: formData.dateAdded,
          lastUpdated: new Date().toISOString(),
        }));
      } else {
        const newHolding: Omit<Holding, 'id'> = {
          ...formData,
          currentPrice: formData.averagePrice, // Initial current price = average price
          dateAdded: formData.dateAdded,
          lastUpdated: new Date().toISOString(),
        };
        dispatch(addHolding(newHolding));
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving holding:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof AddHoldingFormData, value: string | number | AssetCategory) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingHolding ? 'Edit Holding' : 'Add New Holding'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                placeholder="e.g., AAPL"
                className={errors.symbol ? 'border-red-500' : ''}
              />
              {errors.symbol && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.symbol}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: AssetCategory) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AssetCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Apple Inc."
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value) || 0)}
                placeholder="100"
                min="0"
                step="0.01"
                className={errors.quantity ? 'border-red-500' : ''}
              />
              {errors.quantity && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.quantity}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="averagePrice">Average Price</Label>
              <Input
                id="averagePrice"
                type="number"
                value={formData.averagePrice}
                onChange={(e) => handleInputChange('averagePrice', parseFloat(e.target.value) || 0)}
                placeholder="150.00"
                min="0"
                step="0.01"
                className={errors.averagePrice ? 'border-red-500' : ''}
              />
              {errors.averagePrice && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.averagePrice}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector">Sector (Optional)</Label>
              <Input
                id="sector"
                value={formData.sector}
                onChange={(e) => handleInputChange('sector', e.target.value)}
                placeholder="e.g., Technology"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateAdded">Date Added</Label>
              <Input
                id="dateAdded"
                type="date"
                value={formData.dateAdded}
                onChange={(e) => handleInputChange('dateAdded', e.target.value)}
                className={errors.dateAdded ? 'border-red-500' : ''}
              />
              {errors.dateAdded && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.dateAdded}
                </p>
              )}
            </div>
          </div>

          {(formData.quantity > 0 && formData.averagePrice > 0) && (
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Investment:</span>
                <Badge variant="secondary">
                  ${(formData.quantity * formData.averagePrice).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Badge>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[80px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3" />
                  {editingHolding ? 'Update' : 'Add'} Holding
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHoldingDialog;