"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import PortfolioService from '../../services/portfolioService';
import { toast } from 'sonner';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all portfolio items
  const fetchPortfolio = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PortfolioService.getAllPortfolio();
      setPortfolio(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch portfolio');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all portfolio items (admin)
  const fetchPortfolioAdmin = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PortfolioService.getAllPortfolioAdmin();
      setPortfolio(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch portfolio');
    } finally {
      setLoading(false);
    }
  };

  // Create new portfolio item
  const createPortfolio = async (portfolioData) => {
    try {
      const newPortfolio = await PortfolioService.createPortfolio(portfolioData);
      setPortfolio(prev => [newPortfolio, ...prev]);
      toast.success('Portfolio created successfully');
      return newPortfolio;
    } catch (err) {
      toast.error('Failed to create portfolio');
      throw err;
    }
  };

  // Update portfolio item
  const updatePortfolio = async (id, portfolioData) => {
    try {
      const updatedPortfolio = await PortfolioService.updatePortfolio(id, portfolioData);
      setPortfolio(prev => 
        prev.map(item => 
          item.id === id ? updatedPortfolio : item
        )
      );
      toast.success('Portfolio updated successfully');
      return updatedPortfolio;
    } catch (err) {
      toast.error('Failed to update portfolio');
      throw err;
    }
  };

  // Delete portfolio item
  const deletePortfolio = async (id) => {
    try {
      await PortfolioService.deletePortfolio(id);
      setPortfolio(prev => prev.filter(item => item.id !== id));
      toast.success('Portfolio deleted successfully');
    } catch (err) {
      toast.error('Failed to delete portfolio');
      throw err;
    }
  };

  // Update portfolio status
  const updatePortfolioStatus = async (id, status) => {
    try {
      const updatedPortfolio = await PortfolioService.updatePortfolioStatus(id, status);
      setPortfolio(prev => 
        prev.map(item => 
          item.id === id ? updatedPortfolio : item
        )
      );
      toast.success(`Portfolio status updated to ${status}`);
      return updatedPortfolio;
    } catch (err) {
      toast.error('Failed to update portfolio status');
      throw err;
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id, featured) => {
    try {
      const updatedPortfolio = await PortfolioService.toggleFeatured(id, featured);
      setPortfolio(prev => 
        prev.map(item => 
          item.id === id ? updatedPortfolio : item
        )
      );
      toast.success(`Portfolio ${featured ? 'marked as featured' : 'unmarked as featured'}`);
      return updatedPortfolio;
    } catch (err) {
      toast.error('Failed to update featured status');
      throw err;
    }
  };

  // Get portfolio by slug
  const getPortfolioBySlug = async (slug) => {
    try {
      return await PortfolioService.getPortfolioBySlug(slug);
    } catch (err) {
      toast.error('Failed to fetch portfolio details');
      throw err;
    }
  };

  // Get portfolio by ID
  const getPortfolioById = async (id) => {
    try {
      return await PortfolioService.getPortfolioById(id);
    } catch (err) {
      toast.error('Failed to fetch portfolio details');
      throw err;
    }
  };

  // Get portfolio by category
  const getPortfolioByCategory = async (category) => {
    try {
      return await PortfolioService.getPortfolioByCategory(category);
    } catch (err) {
      toast.error('Failed to fetch portfolio by category');
      throw err;
    }
  };

  // Get featured portfolio
  const getFeaturedPortfolio = async () => {
    try {
      return await PortfolioService.getFeaturedPortfolio();
    } catch (err) {
      toast.error('Failed to fetch featured portfolio');
      throw err;
    }
  };

  // Search portfolio
  const searchPortfolio = async (searchTerm) => {
    try {
      return await PortfolioService.searchPortfolio(searchTerm);
    } catch (err) {
      toast.error('Failed to search portfolio');
      throw err;
    }
  };

  const value = {
    portfolio,
    loading,
    error,
    fetchPortfolio,
    fetchPortfolioAdmin,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    updatePortfolioStatus,
    toggleFeatured,
    getPortfolioBySlug,
    getPortfolioById,
    getPortfolioByCategory,
    getFeaturedPortfolio,
    searchPortfolio,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};


