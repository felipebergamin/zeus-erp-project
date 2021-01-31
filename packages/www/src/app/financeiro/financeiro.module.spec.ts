import { FinanceiroModule } from './financeiro.module';

describe('FinanceiroModule', () => {
  let financeiroModule: FinanceiroModule;

  beforeEach(() => {
    financeiroModule = new FinanceiroModule();
  });

  it('should create an instance', () => {
    expect(financeiroModule).toBeTruthy();
  });
});
