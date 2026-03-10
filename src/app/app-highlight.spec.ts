import { AppHighlight } from './app-highlight';

describe('AppHighlight', () => {
  it('should create an instance', () => {
    const directive = new AppHighlight({ nativeElement: document.createElement('div') });
    expect(directive).toBeTruthy();
  });
});
