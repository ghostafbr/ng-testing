import {TestBed} from '@angular/core/testing';

import {ValueService} from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('new value');
      expect(service.getValue()).toBe('new value');
    });
  });

  describe('Tests for getPromiseValue', () => {
    it('should return "Promise value" from promise with then', (doneFn) => {
      service.getPromiseValue().then(value => expect(value).toBe('Promise Value'));
      doneFn();
    });

    it('should return "Promise value" from promise', async () => {
      const resp = await service.getPromiseValue();
      expect(resp).toBe('Promise Value');
    });
  });

  describe('Tests for getObservableValue', () => {
    it('should return "observable value"', (doneFn) => {
      service.getObservableValue().subscribe(value => expect(value).toBe('observable value'));
      doneFn();
    });

    it('should return "observable value" from observable', async () => {
      const resp = await service.getObservableValue().toPromise();
      expect(resp).toBe('observable value');
    });

  });

});
