import { RequestContext } from 'nestjs-request-context';
import { EntityManager } from 'typeorm';

export class AppRequestContext extends RequestContext {
  requestId: string;
  entityManager?: EntityManager; // For global transactions
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    const ctx: AppRequestContext = RequestContext.currentContext.req;
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    return this.getContext().requestId;
  }

  static setEntityManager(entityManager?: EntityManager): void {
    const ctx = this.getContext();
    ctx.entityManager = entityManager;
  }

  static getEntityManager(): EntityManager | undefined {
    return this.getContext().entityManager;
  }

  static clearEntityManager(): void {
    const ctx = this.getContext();
    ctx.entityManager = undefined;
  }
}
