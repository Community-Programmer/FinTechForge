import { toast, ToastOptions } from 'sonner';

export interface NotificationOptions extends ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

class NotificationService {
  /**
   * Show a success notification
   */
  static success(message: string, options?: ToastOptions) {
    return toast.success(message, {
      ...options,
      duration: 3000,
    });
  }

  /**
   * Show an error notification
   */
  static error(message: string, options?: ToastOptions) {
    return toast.error(message, {
      ...options,
      duration: 5000,
    });
  }

  /**
   * Show a warning notification
   */
  static warning(message: string, options?: ToastOptions) {
    return toast(message, {
      ...options,
      duration: 4000,
      className: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    });
  }

  /**
   * Show an info notification
   */
  static info(message: string, options?: ToastOptions) {
    return toast.info(message, {
      ...options,
      duration: 3000,
    });
  }

  /**
   * Show a custom notification
   */
  static custom(message: string, options?: NotificationOptions) {
    const { type = 'info', title, ...restOptions } = options || {};
    
    switch (type) {
      case 'success':
        return this.success(title ? `${title}: ${message}` : message, restOptions);
      case 'error':
        return this.error(title ? `${title}: ${message}` : message, restOptions);
      case 'warning':
        return this.warning(title ? `${title}: ${message}` : message, restOptions);
      default:
        return this.info(title ? `${title}: ${message}` : message, restOptions);
    }
  }
}

export default NotificationService;