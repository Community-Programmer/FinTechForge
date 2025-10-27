from typing import Dict, List, Optional
from pydantic import BaseModel

class FinancialTerm(BaseModel):
    term: str
    definition: str
    category: str  # stock, general, technical, etc.

class FinancialKnowledgeBase:
    def __init__(self):
        self.terms: Dict[str, FinancialTerm] = self._initialize_terms()
    
    def _initialize_terms(self) -> Dict[str, FinancialTerm]:
        """Initialize with some common financial terms"""
        terms_data = [
            {
                "term": "P/E Ratio",
                "definition": "Price-to-Earnings ratio, a valuation metric comparing a company's current share price to its earnings per share.",
                "category": "stock"
            },
            {
                "term": "Market Cap",
                "definition": "Market capitalization, total market value of a company's outstanding shares.",
                "category": "stock"
            },
            {
                "term": "Diversification",
                "definition": "Strategy of spreading investments across various financial instruments to reduce risk.",
                "category": "general"
            },
            {
                "term": "Dividend",
                "definition": "A portion of company profits paid to shareholders.",
                "category": "stock"
            },
            {
                "term": "Volatility",
                "definition": "A statistical measure of the dispersion of returns for a given security or market index.",
                "category": "general"
            },
            {
                "term": "Beta",
                "definition": "A measure of a stock's volatility in relation to the overall market.",
                "category": "stock"
            },
            {
                "term": "Bull Market",
                "definition": "A market condition where prices are rising or expected to rise.",
                "category": "general"
            },
            {
                "term": "Bear Market",
                "definition": "A market condition where prices are falling or expected to fall.",
                "category": "general"
            },
            {
                "term": "Portfolio",
                "definition": "A collection of financial investments like stocks, bonds, commodities, etc.",
                "category": "general"
            },
            {
                "term": "ROI",
                "definition": "Return on Investment, a measure of the profitability of an investment.",
                "category": "general"
            }
        ]
        
        return {term["term"].lower(): FinancialTerm(**term) for term in terms_data}
    
    def get_term(self, term: str) -> Optional[FinancialTerm]:
        return self.terms.get(term.lower())
    
    def search_terms(self, query: str) -> List[FinancialTerm]:
        """Search for terms that contain the query string"""
        query_lower = query.lower()
        return [
            term for term in self.terms.values()
            if query_lower in term.term.lower() or query_lower in term.definition.lower()
        ]
    
    def get_category_terms(self, category: str) -> List[FinancialTerm]:
        return [term for term in self.terms.values() if term.category == category]

# Global instance
financial_kb = FinancialKnowledgeBase()