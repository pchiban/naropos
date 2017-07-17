import { NaroposPage } from './app.po';

describe('naropos App', function() {
  let page: NaroposPage;

  beforeEach(() => {
    page = new NaroposPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
