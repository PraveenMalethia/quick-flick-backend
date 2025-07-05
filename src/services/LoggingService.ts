import { LOGGER } from '../utils/logger';

export class LoggingService {
  logCronExecution(message: string, data?: any) {
    LOGGER.info(`[CRON] ${message}`, {
      timestamp: new Date().toISOString(),
      type: 'CRON_EXECUTION',
      ...data
    });
  }

  logCronError(error: Error, context?: any) {
    LOGGER.error(`[CRON] Error: ${error.message}`,);
  }

  logBetUpdate(betId: string, action: string, details?: any) {
    LOGGER.info(`[BET_UPDATE] ${action}`, {
      betId,
      timestamp: new Date().toISOString(),
      type: 'BET_UPDATE',
      ...details
    });
  }

  logPriceUpdate(symbol: string, price: number, context?: any) {
    LOGGER.info(`[PRICE_UPDATE] Price fetched for ${symbol}`, {
      symbol,
      price,
      timestamp: new Date().toISOString(),
      type: 'PRICE_UPDATE',
      ...context
    });
  }
}
