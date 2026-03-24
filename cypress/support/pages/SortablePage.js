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

  isInAscendingOrder() {
    return this.getListItemTexts().then(items => {
      // Define numeric order for number words
      const numberOrder = { 'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6 };
      const sorted = [...items].sort((a, b) => numberOrder[a] - numberOrder[b]);

      return JSON.stringify(items) === JSON.stringify(sorted);
    });
  }

  sortInAscendingOrder() {
    this.getListItemTexts().then(items => {
      cy.log(`📋 Items atuais: ${items.join(', ')}`);

      // Define numeric order for number words
      const numberOrder = { 'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6 };
      const sorted = [...items].sort((a, b) => numberOrder[a] - numberOrder[b]);

      cy.log(`📋 Items ordenados (numérico): ${sorted.join(', ')}`);

      // Only sort if not already sorted
      if (JSON.stringify(items) !== JSON.stringify(sorted)) {
        // Build a list of moves needed
        const moves = [];
        const currentOrder = [...items];

        sorted.forEach((targetText, targetIndex) => {
          const currentIndex = currentOrder.indexOf(targetText);
          if (currentIndex !== targetIndex) {
            moves.push({ text: targetText, from: currentIndex, to: targetIndex });
            // Update currentOrder to reflect the move
            currentOrder.splice(currentIndex, 1);
            currentOrder.splice(targetIndex, 0, targetText);
          }
        });

        cy.log(`🔄 Executando ${moves.length} movimentos...`);

        // Execute moves
        moves.forEach((move, index) => {
          cy.log(`   ${index + 1}. Movendo "${move.text}" da posição ${move.from} para ${move.to}`);

          cy.contains('.list-group-item', move.text).then($source => {
            this.elements.listItems().eq(move.to).then($target => {
              cy.wrap($source).drag($target[0]);
            });
          });

          cy.wait(300);
        });
      } else {
        cy.log('✅ Lista já está ordenada, nenhum movimento necessário');
      }
    });
  }

  verifyInAscendingOrder() {
    this.getListItemTexts().then(items => {
      // Define numeric order for number words
      const numberOrder = { 'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6 };
      const sorted = [...items].sort((a, b) => numberOrder[a] - numberOrder[b]);

      cy.log(`📋 Ordem atual: ${items.join(', ')}`);
      cy.log(`📋 Ordem esperada: ${sorted.join(', ')}`);

      expect(JSON.stringify(items)).to.equal(JSON.stringify(sorted));
    });
  }
}

export default new SortablePage();
