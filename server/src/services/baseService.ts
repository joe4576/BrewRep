/**
 * Abstract class that passes a valid tenantId
 * to each service's constructor
 */
export abstract class BaseService {
  protected tenantId: string;

  constructor(tenantId: string) {
    this.tenantId = tenantId;
  }
}
