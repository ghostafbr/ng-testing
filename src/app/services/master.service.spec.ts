import {TestBed} from '@angular/core/testing';

import {MasterService} from './master.service';
import {ValueService} from "./value.service";
import {ValueFakeService} from "./value-fake.service";

describe('MasterService', () => {
  let masterService: MasterService;
  let valueService: ValueService;

  beforeEach(() => {
    valueService = TestBed.inject(ValueService);
    masterService = TestBed.inject(MasterService);
  });

  /*it('should return "my value" from the real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });

  it('should return "my value" from a fake service (not recommended)', () => {
    const valueFakeService = new ValueFakeService();
    const masterService = new MasterService(valueFakeService as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return "my value" from a fake Object', () => {
    const fake = {getValue: () => 'fake value'};
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });*/

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  it('should call to getValue from ValueService', () => {
    const spy = jest.spyOn(valueService, 'getValue');
    spy.mockReturnValue('fake value');

    expect(masterService.getValue()).toBe('fake value');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore(); // Restaura el espía original para evitar efectos secundarios en otras pruebas
  });

});
