class SortablePage {
  elements = {
    sortableMenu: () => cy.contains('.text', 'Sortable'),
    listItems: () => cy.get('.vertical-list-container .list-group-item')
  };

  clickSortable() {
    this.elements.sortableMenu().scrollIntoView().click();
    this.removeAds();
  }

  removeAds() {
    cy.document().then(doc => {
      const footer = doc.querySelector('footer');
      if (footer) footer.remove();
      const ads = doc.querySelectorAll('ins, iframe[id*="google_ads"]');
      ads.forEach(ad => ad.remove());
    });
  }

  getListItemTexts() {
    const texts = [];
    return this.elements.listItems().each($el => {
      texts.push($el.text());
    }).then(() => texts);
  }

  sortInAscendingOrder() {
    this.getListItemTexts().then(items => {
      const sorted = [...items].sort();

      // Only sort if not already sorted
      if (JSON.stringify(items) !== JSON.stringify(sorted)) {
        sorted.forEach((text, targetIndex) => {
          const currentIndex = items.indexOf(text);
          if (currentIndex !== targetIndex) {
            // Drag and drop
            cy.contains('.list-group-item', text)
              .trigger('dragstart');

            this.elements.listItems()
              .eq(targetIndex)
              .trigger('drop');

            cy.wait(500);
          }
        });
      }
    });
  }

  verifyInAscendingOrder() {
    this.getListItemTexts().then(items => {
      const sorted = [...items].sort();
      expect(JSON.stringify(items)).to.equal(JSON.stringify(sorted));
    });
  }
}

export default new SortablePage();
