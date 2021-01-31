import { ProvedorModule } from './provedor.module';

describe('ProvedorModule', () => {
  let provedorModule: ProvedorModule;

  beforeEach(() => {
    provedorModule = new ProvedorModule();
  });

  it('should create an instance', () => {
    expect(provedorModule).toBeTruthy();
  });
});
