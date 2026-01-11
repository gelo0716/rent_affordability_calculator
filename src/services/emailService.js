/**
 * Email collection and management service for Supabase integration
 * Provides functionality for email validation, submission, and Google Sheets sync
 */

import { supabase } from '../lib/supabase';

export const emailService = {
  /**
   * Validates email format using regex pattern
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if email is valid
   */
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email?.trim());
  },

  /**
   * Submits email for content access to Supabase
   * @param {string} email - User's email address
   * @returns {Promise<Object>} - Result object with success status and message
   */
  submitEmailForAccess: async (email) => {
    try {
      if (!email || !emailService?.validateEmail(email)) {
        return {
          success: false,
          message: 'Please provide a valid email address'
        };
      }

      const trimmedEmail = email?.trim()?.toLowerCase();
      const userAgent = navigator?.userAgent || null;

      // Use RPC function that returns array format
      const { data, error } = await supabase?.rpc('submit_email_for_access', {
        user_email: trimmedEmail,
        user_agent: userAgent
      });

      if (error) {
        console.error('Error submitting email:', error);
        return {
          success: false,
          message: error?.message || 'Database error. Please try again.'
        };
      }

      // Handle array response from RPC function
      const result = data?.[0];
      if (!result) {
        return {
          success: false,
          message: 'Invalid response from server'
        };
      }

      return {
        success: result?.success || false,
        message: result?.message || 'Unknown response',
        isExisting: result?.existing || false
      };

    } catch (err) {
      console.error('Email submission error:', err);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  },

  /**
   * Saves calculator session data linked to email
   * @param {string} email - User's email address
   * @param {Object} sessionData - Calculator input data
   * @returns {Promise<Object>} - Result object with success status
   */
  saveCalculatorSession: async (email, sessionData) => {
    try {
      if (!email || !sessionData) {
        return { success: false, message: 'Missing required data' };
      }

      const { monthly_income, non_rent_expenses, rent_percentage } = sessionData;
      
      // Calculate derived values
      const calculated_rent = Math.round((monthly_income * rent_percentage) / 100);
      const disposable_income = monthly_income - calculated_rent - non_rent_expenses;
      
      const sessionMetadata = {
        timestamp: new Date()?.toISOString(),
        meets_three_times_rule: monthly_income >= (calculated_rent * 3),
        follows_30_rule: rent_percentage <= 30,
        has_emergency_buffer: disposable_income >= 500,
        browser_info: {
          userAgent: navigator?.userAgent,
          platform: navigator?.platform,
          language: navigator?.language
        }
      };

      // Use RPC function with correct parameters
      const { data, error } = await supabase?.rpc('save_calculator_session', {
        user_email: email?.trim()?.toLowerCase(),
        monthly_income: parseFloat(monthly_income) || 0,
        non_rent_expenses: parseFloat(non_rent_expenses) || 0,
        rent_percentage: parseInt(rent_percentage) || 30,
        calculated_rent: calculated_rent,
        disposable_income: disposable_income,
        session_data: sessionMetadata
      });

      if (error) {
        console.error('Error saving calculator session:', error);
        return { 
          success: false, 
          message: error?.message || 'Failed to save session data' 
        };
      }

      // Handle array response from RPC function
      const result = data?.[0];
      return { 
        success: result?.success || false,
        message: result?.message || 'Session saved',
        data: result
      };

    } catch (err) {
      console.error('Calculator session save error:', err);
      return { success: false, message: 'Network error saving session' };
    }
  },

  /**
   * Placeholder for Google Sheets integration
   * Note: This requires server-side implementation for security
   * @param {string} email - Email to sync to Google Sheets
   * @returns {Promise<Object>} - Result object
   */
  syncToGoogleSheets: async (email) => {
    try {
      // TODO: Implement server-side Google Sheets API integration
      // This would typically be done via a serverless function or webhook
      // to keep API credentials secure
      
      console.log('Google Sheets sync requested for:', email);
      
      // For now, return success (implement actual sync server-side)
      return {
        success: true,
        message: 'Queued for Google Sheets sync'
      };

    } catch (err) {
      console.error('Google Sheets sync error:', err);
      return {
        success: false,
        message: 'Sync to Google Sheets failed'
      };
    }
  }
};